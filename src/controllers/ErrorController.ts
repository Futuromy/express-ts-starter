import type { NextFunction, Request, Response } from 'express';

import { ApiError } from '@/errors/ApiError';
import { ErrorCode } from '@/errors/ErrorCode';
import { RequestError } from '@/errors/RequestError';

/**
 * Handling 404 error not found.
 */
export const handler404 = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(404).json({ errors: ErrorCode.NOT_FOUND });
};

/**
 * Global error handling for all applications.
 */
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof RequestError) {
    res.status(400).json({
      errors: err.errorList,
    });
  } else if (err instanceof ApiError) {
    res.status(500).json({ errors: err.publicErrorCode });
  } else {
    res.status(500).json({ errors: ErrorCode.INTERNAL_SERVER_ERROR });
  }
};
