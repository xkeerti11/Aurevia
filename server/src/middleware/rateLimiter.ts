import { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipRequestMap = new Map<string, RateLimitRecord>();

export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown-ip';
    const now = Date.now();

    const record = ipRequestMap.get(ip);

    if (!record || now > record.resetTime) {
      ipRequestMap.set(ip, {
        count: 1,
        resetTime: now + windowMs
      });
      next();
      return;
    }

    if (record.count >= maxRequests) {
      res.status(429).json({
        success: false,
        error: 'Too many requests. Please slow down and try again shortly.',
        retryAfterSec: Math.ceil((record.resetTime - now) / 1000)
      });
      return;
    }

    record.count += 1;
    next();
  };
};

// Rate limiting presets matching PRD
export const generalLimiter = createRateLimiter(100, 60 * 1000); // 100 req/min
export const bookingLimiter = createRateLimiter(20, 60 * 1000);  // 20 bookings/min
export const authLimiter = createRateLimiter(20, 15 * 60 * 1000); // 20 login attempts / 15 mins
