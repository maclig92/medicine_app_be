import { NextFunction, Request, Response } from 'express';

export class ValidationError extends Error {}

export class NotFoundError extends Error {}

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  res
    .status(
      err instanceof ValidationError
        ? 400
        : err instanceof NotFoundError
        ? 404
        : 500,
    )
    .json({
      message:
        err instanceof ValidationError || err instanceof NotFoundError
          ? err.message
          : 'Sorry, please try again later.',
    });
};
