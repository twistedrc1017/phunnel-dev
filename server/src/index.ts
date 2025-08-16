import express, { Request, Response, Application } from 'express';
import cors from 'cors';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3001', 10);

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.get('/', (req: Request, res: Response) => {
  console.log('Hello World');
  res.json({ 
    message: 'Hello World', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    service: 'Phunnel Server',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Visit http://localhost:${PORT} to test the endpoint`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});

export default app;