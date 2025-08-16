import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { env, isDevelopment } from '../config/environment';

// Security headers middleware
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
});

// Rate limiting middleware
export const rateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: {
    error: 'Too many requests',
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req: Request) => isDevelopment && req.ip === '127.0.0.1',
});

// API key validation middleware
export const validateApiKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const apiKey = req.headers['x-api-key'] as string;
    
    if (!apiKey) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'API key is required',
      });
      return;
    }

    if (apiKey !== env.API_KEY) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid API key',
      });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Request validation middleware
export const validateRequest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Add custom request validation logic here
    const contentType = req.headers['content-type'];
    
    if (req.method === 'POST' && contentType && !contentType.includes('application/json')) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Content-Type must be application/json',
      });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};