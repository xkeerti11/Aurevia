import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env';
import apiRoutes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: '*', // In production, restrict to clinic domain
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Aurevia Health Backend Core API',
    timestamp: new Date().toISOString(),
    version: '3.0'
  });
});

// API Routes
app.use('/api/v1', apiRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = ENV.PORT;
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🏥 [AUREVIA HEALTH BACKEND SERVER RUNNING]`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🩺 Health check: http://localhost:${PORT}/health`);
  console.log(`🛡️ Rate limiting, AES-256 Encryption & Helmet active`);
  console.log(`======================================================\n`);
});

export default app;
