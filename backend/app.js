import envs from './configs/env.config.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import apiRoutes from './routes/index.js';
import errorHandler from './utils/helpers/errorHandler.helper.js';
import StatusError from './utils/helpers/statusError.helper.js';

const app = express();

// Middlewares
app.use(helmet());

app.use(cors({
  origin: envs.server.clientUrl,
  credentials: true
}));

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', apiRoutes);

// 404 handler
app.use((req, res) => {
  throw StatusError.notFound('API Route Not found');
});

// Global error handler
app.use(errorHandler);

export default app;
