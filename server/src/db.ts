import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { ENV } from './config/env';

const dbUrl = ENV.DATABASE_URL || 'file:./dev.db';

let adapter: any;

if (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')) {
  // Production Cloud PostgreSQL (Supabase / Neon)
  const pool = new pg.Pool({ connectionString: dbUrl });
  adapter = new PrismaPg(pool);
  console.log('🐘 [DATABASE]: Connected to Cloud PostgreSQL (Supabase)');
} else {
  // Local SQLite Development
  adapter = new PrismaBetterSqlite3({ url: dbUrl.replace(/^file:/, '') });
  console.log('📁 [DATABASE]: Connected to Local SQLite Engine');
}

export const prisma = new PrismaClient({ adapter });
