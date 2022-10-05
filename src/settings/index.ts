import { LoggerOptions } from 'typeorm';
import { resolve } from 'path';

const dir = resolve(__dirname, '..');

export const DB_HOST = process.env.DB_HOST || 'db';

export const DB_PORT = Number(process.env.DB_PORT) || 9999;

export const DB_NAME = process.env.DB_NAME || 'db_name';

export const DB_USER = process.env.DB_USER || 'db_user';

export const DB_PASS = process.env.DB_PASS || 'db_pass';

export const DB_PATH_ENTITIES = `${dir}/database/entities/*.{ts,js}`;

export const DB_PATH_MIGRATIONS = `${dir}/database/migrations/*.{ts,js}`;

export const DB_PATH_SEEDS = `${dir}/database/seeds/*.{ts,js}`;

export const DB_LOGGING: LoggerOptions = ['error', 'warn', 'query'];
