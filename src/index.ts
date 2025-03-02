import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';


import routes from './routes';
import { config } from './utils/config';


const app: Express = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// API Routes
app.use(config.api.prefix, routes);

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});




app.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running in ${config.nodeEnv} mode on port ${config.port}`);
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Resource not found',
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  // Log the error with request information
  console.error(`[ERROR] ${req.method} ${req.path}:`, {
    error: err.message,
    stack: err.stack,
    statusCode: err.statusCode || err.status,
  });

  // Determine status code from error object or default to 500
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Server Error Occurred';
  
  // Build error response
  const errorResponse: any = {
    success: false,
    message,
    statusCode,
  };

  // Include stack trace only in development environment
  if (config.nodeEnv === 'development') {
    errorResponse.stack = err.stack;
    
    // Include validation errors if available
    if (err.errors) {
      errorResponse.errors = err.errors;
    }
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
});

export default app;

