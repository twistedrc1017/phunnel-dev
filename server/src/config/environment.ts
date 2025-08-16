import dotenv from 'dotenv';
import { cleanEnv, port, str, num } from 'envalid';

// Load environment variables
dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  PORT: port({ default: 3001 }),
  CORS_ORIGIN: str({ default: 'http://localhost:8080' }),
  JWT_SECRET: str({ default: 'dev-secret-key' }),
  API_KEY: str({ default: 'dev-api-key' }),
  RATE_LIMIT_WINDOW_MS: num({ default: 900000 }), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: num({ default: 100 }),
  LOG_LEVEL: str({ choices: ['error', 'warn', 'info', 'debug'], default: 'info' }),
});

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';