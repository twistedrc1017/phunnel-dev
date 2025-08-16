import morgan from 'morgan';
import { Request, Response } from 'express';
import { isDevelopment, env } from '../config/environment';

// Custom token for response time
morgan.token('response-time-colored', (req: Request, res: Response): string => {
  const responseTime = parseFloat(morgan['response-time'](req, res) || '0');
  if (responseTime > 1000) return `\x1b[31m${responseTime}ms\x1b[0m`; // Red for slow
  if (responseTime > 500) return `\x1b[33m${responseTime}ms\x1b[0m`; // Yellow for medium
  return `\x1b[32m${responseTime}ms\x1b[0m`; // Green for fast
});

// Custom token for status code with colors
morgan.token('status-colored', (req: Request, res: Response): string => {
  const status = res.statusCode;
  if (status >= 500) return `\x1b[31m${status}\x1b[0m`; // Red for server errors
  if (status >= 400) return `\x1b[33m${status}\x1b[0m`; // Yellow for client errors
  if (status >= 300) return `\x1b[36m${status}\x1b[0m`; // Cyan for redirects
  return `\x1b[32m${status}\x1b[0m`; // Green for success
});

// Development logging format
const devFormat = ':method :url :status-colored :response-time-colored :res[content-length] - :user-agent';

// Production logging format
const prodFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';

// Export the appropriate logger based on environment
export const httpLogger = isDevelopment
  ? morgan(devFormat)
  : morgan(prodFormat);

// Custom logger for application events
export const logger = {
  info: (message: string, ...args: any[]): void => {
    if (['info', 'debug'].includes(env.LOG_LEVEL)) {
      console.log(`\x1b[36m[INFO]\x1b[0m ${new Date().toISOString()} - ${message}`, ...args);
    }
  },
  error: (message: string, ...args: any[]): void => {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${new Date().toISOString()} - ${message}`, ...args);
  },
  warn: (message: string, ...args: any[]): void => {
    if (['warn', 'info', 'debug'].includes(env.LOG_LEVEL)) {
      console.warn(`\x1b[33m[WARN]\x1b[0m ${new Date().toISOString()} - ${message}`, ...args);
    }
  },
  debug: (message: string, ...args: any[]): void => {
    if (env.LOG_LEVEL === 'debug') {
      console.log(`\x1b[35m[DEBUG]\x1b[0m ${new Date().toISOString()} - ${message}`, ...args);
    }
  },
};