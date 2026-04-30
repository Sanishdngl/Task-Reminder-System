import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import taskRoutes from './routes/task.routes';
import { swaggerSpec } from './config/swagger';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Swagger Docs ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Routes ---
app.use('/api/tasks', taskRoutes);

// --- Health Check ---
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// --- Global Error Handler ---
app.use(errorHandler);

export default app;
