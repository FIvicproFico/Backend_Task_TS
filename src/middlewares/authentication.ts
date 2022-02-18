import express from 'express';
import jwt from 'jsonwebtoken';

import env from '../config/env-config';

const authenticateJWT = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, env.accessTokenSecret, (err, user) => {
      if (err) res.sendStatus(403); // If Invalid token;
      res.locals.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // No Token
  }
};

export default authenticateJWT;
