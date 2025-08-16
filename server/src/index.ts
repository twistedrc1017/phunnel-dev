// Express 5 has built-in async error handling, but we keep this for consistency
import 'express-async-errors';
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import compression from 'compression';
import { env, isDevelopment, isProduction } from './config/environment';
import { securityHeaders, rateLimiter, validateRequest } from './middleware/security';
import { httpLogger, logger } from './middleware/logging';
import { globalErrorHandler, handleNotFound } from './middleware/errorHandler';
import apiRoutes from './routes/api';

const app: Application = express();

// Express 5: Trust proxy configuration (improved syntax)
app.set('trust proxy', true);

// Security middleware
app.use(securityHeaders);

// CORS configuration
app.use(cors({
  origin: isDevelopment ? true : env.CORS_ORIGIN.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'x-request-id'],
}));

// Compression middleware
app.use(compression({
  threshold: 1024, // Only compress responses > 1KB
  level: 6, // Compression level (1-9)
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
}));

// Request parsing middleware
app.use(express.json({ 
  limit: '10mb',
  type: ['application/json', 'text/plain'],
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb',
}));

// Logging middleware
app.use(httpLogger);

// Rate limiting (only in production)
if (isProduction) {
  app.use(rateLimiter);
}

// Request validation
app.use(validateRequest);

// Add request ID for tracing (Express 5 compatible)
app.use((req: Request, res: Response, next: NextFunction): void => {
  const requestId = (req.headers['x-request-id'] as string) || 
    Math.random().toString(36).substr(2, 9);
  req.headers['x-request-id'] = requestId;
  res.setHeader('x-request-id', requestId);
  next();
});

// API routes
app.use('/api/v1', apiRoutes);

// Backward compatibility routes
app.use('/', apiRoutes);

// Handle unhandled routes
app.use('*', handleNotFound);

// Global error handling middleware
app.use(globalErrorHandler);

// Start server
const startServer = async (): Promise<void> => {
  try {
    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Server running on port ${env.PORT}`);
      logger.info(`📍 Visit http://localhost:${env.PORT} to test the endpoint`);
      logger.info(`🌍 Environment: ${env.NODE_ENV}`);
      logger.info(`🔒 Security headers: ${isProduction ? 'Enabled' : 'Development mode'}`);
      logger.info(`⚡ Rate limiting: ${isProduction ? 'Enabled' : 'Disabled (dev mode)'}`);
    });

    // Graceful shutdown handlers
    const gracefulShutdown = (signal: string) => {
      logger.info(`🛑 ${signal} received, shutting down gracefully`);
      server.close(async () => {
        logger.info('✅ Server closed');
        
        // Close database connections, cleanup resources here
        // await db.close();
        
        logger.info('✅ All resources cleaned up');
        process.exit(0);
      });

      // Force close server after 30 seconds
      setTimeout(() => {
        logger.error('❌ Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 30000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (err: Error) => {
      logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', err);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err: Error) => {
      logger.error('UNHANDLED REJECTION! 💥 Shutting down...', err);
      server.close(() => {
        process.exit(1);
      });
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;