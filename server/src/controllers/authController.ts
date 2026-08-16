import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { z } from 'zod';
import { prisma } from '../db';
import { ENV } from '../config/env';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  remember_me: z.boolean().optional()
});

const forgotPasswordSchema = z.object({
  email: z.string().email()
});

const resetPasswordSchema = z.object({
  token: z.string().min(10),
  email: z.string().email(),
  password: z.string().min(8)
});

export class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    const ip = req.ip || req.headers['x-forwarded-for']?.toString() || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'unknown';

    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          error: { code: 'INVALID_INPUT', message: 'Please enter a valid email and password' }
        });
        return;
      }

      const { email, password, remember_me } = parsed.data;
      const normalizedEmail = email.toLowerCase().trim();

      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail }
      });

      if (!user) {
        // Log invalid email attempt
        await prisma.adminLoginLog.create({
          data: {
            email: normalizedEmail,
            ipAddress: ip,
            userAgent,
            loginStatus: 'invalid_email',
            errorMessage: 'User not found in directory'
          }
        });

        res.status(401).json({
          success: false,
          error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
        });
        return;
      }

      // Check if account is currently locked
      if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
        const remainingMinutes = Math.ceil(
          (new Date(user.lockedUntil).getTime() - Date.now()) / 60000
        );

        await prisma.adminLoginLog.create({
          data: {
            userId: user.id,
            email: normalizedEmail,
            ipAddress: ip,
            userAgent,
            loginStatus: 'failed_locked',
            errorMessage: `Account locked for ${remainingMinutes} more minutes`
          }
        });

        res.status(403).json({
          success: false,
          error: {
            code: 'ACCOUNT_LOCKED',
            message: `Account is temporarily locked due to multiple failed attempts. Please try again in ${remainingMinutes} minutes or reset your password.`
          }
        });
        return;
      }

      // Check if account is active
      if (!user.isActive) {
        res.status(403).json({
          success: false,
          error: { code: 'ACCOUNT_DISABLED', message: 'Your account is disabled. Please contact clinic administrator.' }
        });
        return;
      }

      // Compare password with bcrypt
      const isMatch = await bcrypt.compare(password, user.passwordHash);

      if (!isMatch) {
        const newFailedAttempts = (user.failedLoginAttempts || 0) + 1;
        const shouldLock = newFailedAttempts >= 5;
        const lockUntil = shouldLock ? new Date(Date.now() + 15 * 60 * 1000) : null;

        await prisma.user.update({
          where: { id: user.id },
          data: {
            failedLoginAttempts: newFailedAttempts,
            lastFailedLoginAt: new Date(),
            lockedUntil: lockUntil
          }
        });

        await prisma.adminLoginLog.create({
          data: {
            userId: user.id,
            email: normalizedEmail,
            ipAddress: ip,
            userAgent,
            loginStatus: shouldLock ? 'failed_locked' : 'failed_password',
            errorMessage: shouldLock ? 'Account locked after 5 failed attempts' : `Failed attempt ${newFailedAttempts}/5`
          }
        });

        const errorMessage = shouldLock
          ? 'Too many failed login attempts. Your account has been locked for 15 minutes.'
          : `Invalid email or password. Attempt ${newFailedAttempts} of 5.`;

        res.status(401).json({
          success: false,
          error: { code: shouldLock ? 'ACCOUNT_LOCKED' : 'INVALID_CREDENTIALS', message: errorMessage }
        });
        return;
      }

      // Login Successful -> Reset failed attempts, update last login
      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: 0,
          lastFailedLoginAt: null,
          lockedUntil: null,
          lastLoginAt: new Date(),
          lastLoginIp: ip
        }
      });

      await prisma.adminLoginLog.create({
        data: {
          userId: user.id,
          email: normalizedEmail,
          ipAddress: ip,
          userAgent,
          loginStatus: 'success'
        }
      });

      // Sign JWT token
      const expiresIn = remember_me ? '30d' : '24h';
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
          name: user.name
        },
        ENV.JWT_SECRET,
        { expiresIn }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name
        }
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: err.message } });
    }
  }

  public static async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const parsed = forgotPasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, error: { code: 'INVALID_EMAIL', message: 'A valid email is required' } });
        return;
      }

      const normalizedEmail = parsed.data.email.toLowerCase().trim();
      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail }
      });

      // Generic response to prevent account enumeration
      if (!user) {
        res.json({
          success: true,
          message: 'If an account exists with this email, a password reset link has been sent.'
        });
        return;
      }

      // Generate secure 32-byte token
      const rawToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 Hour

      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordResetToken: hashedToken,
          passwordResetExpires: expiresAt
        }
      });

      const resetUrl = `http://localhost:5173/admin/reset-password?token=${rawToken}&email=${encodeURIComponent(normalizedEmail)}`;

      console.log('\n======================================================');
      console.log('✉️  [PASSWORD RESET DISPATCH SERVICE]');
      console.log(`To: ${user.name} <${normalizedEmail}>`);
      console.log(`Reset URL: ${resetUrl}`);
      console.log('Token expires in 1 hour');
      console.log('======================================================\n');

      res.json({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.',
        devResetUrl: resetUrl // For local verification convenience
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: err.message } });
    }
  }

  public static async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const parsed = resetPasswordSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({
          success: false,
          error: { code: 'INVALID_INPUT', message: 'Password must be at least 8 characters long with valid token' }
        });
        return;
      }

      const { token, email, password } = parsed.data;
      const normalizedEmail = email.toLowerCase().trim();

      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

      const user = await prisma.user.findFirst({
        where: {
          email: normalizedEmail,
          passwordResetToken: hashedToken,
          passwordResetExpires: { gt: new Date() }
        }
      });

      if (!user) {
        res.status(400).json({
          success: false,
          error: { code: 'INVALID_OR_EXPIRED_TOKEN', message: 'Password reset link is invalid or has expired. Please request a new link.' }
        });
        return;
      }

      // Hash new password with bcrypt cost 12
      const passwordHash = await bcrypt.hash(password, 12);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash,
          passwordResetToken: null,
          passwordResetExpires: null,
          failedLoginAttempts: 0,
          lockedUntil: null
        }
      });

      console.log(`🔑 [PASSWORD RESET]: Password successfully updated for ${normalizedEmail}`);

      res.json({
        success: true,
        message: 'Your password has been successfully reset. You can now login with your new credentials.'
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: { code: 'INTERNAL_ERROR', message: err.message } });
    }
  }

  public static async logout(req: Request, res: Response): Promise<void> {
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  }

  public static async getMe(req: any, res: Response): Promise<void> {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, email: true, role: true, name: true, phone: true }
    });

    res.json({ success: true, user });
  }
}
