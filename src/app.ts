import cors from 'cors';
import express, { json } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { errorHandler, handler404 } from './controllers/ErrorController';
import mainRouter from './routes/MainRoute';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(json());

app.get('/health', (_req, res) => {
  res.status(200).json({ server: 'ok' });
});

// Routes
app.use(mainRouter);

// Error handler middlewares
app.use(handler404);
app.use(errorHandler);

// Trust proxy
app.set('trust proxy', true);

export default app;
