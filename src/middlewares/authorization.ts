import express from 'express';

import env from '../config/env-config';

const authorize = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { role }: { role: string } = res.locals.user;
  if (role !== env.admin) {
    res.sendStatus(403);
  } else {
    next();
  }
};

export default authorize;