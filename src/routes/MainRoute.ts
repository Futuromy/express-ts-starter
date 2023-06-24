import { Router } from 'express';

import mainController from '@/controllers/MainController';
import { paramsMainValidation } from '@/Validations/MainValidation';

const mainRouter = Router();

mainRouter.get('/main/:id', paramsMainValidation, mainController.getMessage);

export default mainRouter;
