import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { validateApiKey } from '../middleware/security';
import { logger } from '../middleware/logging';

const router = Router();

// Health check endpoint
router.get('/health', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const healthData = {
    status: 'OK',
    service: 'Phunnel Server',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    memory: process.memoryUsage(),
    pid: process.pid,
  };

  logger.info('Health check requested');
  res.json(healthData);
}));

// Main endpoint with Hello World
router.get('/', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 10)); // Simulate async operation
  
  logger.info('Hello World endpoint accessed');
  
  const responseData = {
    message: 'Hello World',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    requestId: req.headers['x-request-id'] || Math.random().toString(36).substr(2, 9),
  };

  res.json(responseData);
}));

// Protected endpoint example
router.get('/protected', validateApiKey, asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate async operation
  
  logger.info('Protected endpoint accessed');
  
  res.json({
    message: 'This is a protected endpoint',
    timestamp: new Date().toISOString(),
    authenticated: true,
  });
}));

// Example POST endpoint
router.post('/data', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { data } = req.body;
  
  if (!data) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Data field is required',
    });
  }

  // Simulate async processing
  await new Promise(resolve => setTimeout(resolve, 100));
  
  logger.info('Data processed successfully', { dataLength: data.length });
  
  res.status(201).json({
    message: 'Data processed successfully',
    receivedData: data,
    processedAt: new Date().toISOString(),
    id: Math.random().toString(36).substr(2, 9),
  });
}));

export default router;