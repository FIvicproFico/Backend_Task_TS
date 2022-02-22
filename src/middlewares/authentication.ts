import express from 'express';
import jwt from 'jsonwebtoken';

import env from '../config/env-config';
import userService from '../services/userService';

interface IUser {
  id: number;
  uuid: string;
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  addressId: number;
  createdAt: Date;
  updatedAt: Date;
}

const authenticateJWT = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = req.headers.authorization.split(' ')[1];

    const foo = async (): Promise<void> => {
      const myPromise = new Promise<IUser>((resolve, reject) => {
        jwt.verify(token, env.accessTokenSecret, (err, user) => {
          if (err) {
            reject(err); // JWT Error
          }
          userService
            .getUserByEmail(user.email)
            .then(dbUser => {
              if (dbUser) resolve(dbUser);
            })
            .catch(error => {
              reject(error); // DB Error
            });
        });
      });

      try {
        const user = await myPromise;
        res.locals.user = user;
        next();
      } catch (error) {
        res.sendStatus(404); // No User
      }
    };

    foo();
  } else {
    res.sendStatus(401); // No Token
  }
};

export default authenticateJWT;
