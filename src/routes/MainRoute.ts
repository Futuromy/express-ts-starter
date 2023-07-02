import { Router } from 'express';

import mainController from '@/controllers/MainController';
import { rateLimitMiddleware } from '@/middlewares/RateLimiter';

const mainRouter = Router();

mainRouter.get(
  '/main/:id',
  rateLimitMiddleware(10, 10),
  mainController.getMessage
);

export default mainRouter;
