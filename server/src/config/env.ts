import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: Number(process.env.PORT) || 5000,
  DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
  JWT_SECRET: process.env.JWT_SECRET || 'aurevia_super_secure_jwt_secret_key_2026_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
  NODE_ENV: process.env.NODE_ENV || 'development'
};
