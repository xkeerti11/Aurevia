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

// Root and Health check endpoints (essential for Render / Cloud deploy monitoring)
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Aurevia Health Backend Core API',
    documentation: '/api/v1',
    health: '/health'
  });
});

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

const PORT = Number(process.env.PORT) || Number(ENV.PORT) || 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`\n======================================================`);
  console.log(`🏥 [AUREVIA HEALTH BACKEND SERVER RUNNING]`);
  console.log(`🌐 Bound to HOST: ${HOST} | PORT: ${PORT}`);
  console.log(`🩺 Health check: http://${HOST}:${PORT}/health`);
  console.log(`🛡️ Rate limiting, AES-256 Encryption & Helmet active`);
  console.log(`======================================================\n`);
});

export default app;
