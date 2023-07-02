import { Router } from 'express';

import mainController from '@/controllers/MainController';
import { rateLimitMiddleware } from '@/middlewares/RateLimiter';
import { paramsMainValidation } from '@/Validations/MainValidation';

const mainRouter = Router();

mainRouter.get(
  '/main/:id',
  [paramsMainValidation, rateLimitMiddleware(1, 10)],
  mainController.getMessage
);

export default mainRouter;
