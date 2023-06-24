import { z } from 'zod';

import { validateRequest } from '@/middlewares/Validation';

export const paramsMainValidation = validateRequest({
  params: z.object({
    id: z.string(),
  }),
});

export type ParamsMainHandler = typeof paramsMainValidation;
