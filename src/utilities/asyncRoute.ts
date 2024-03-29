import express from 'express';

export const asyncRoute = (
  fn: (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => Promise<void>,
): ((
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => Promise<void>) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
