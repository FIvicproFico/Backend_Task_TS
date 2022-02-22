import express from 'express';

import jokeService from '../services/jokeService';
import authenticate from '../middlewares/authentication';

const router = express.Router();

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

/* GET user specific joke. */
router.get(
  '/',
  authenticate,
  (req: express.Request, res: express.Response): void => {
    const { name, surname, email }: IUser = res.locals.user;
    jokeService
      .sendNamedRequest(name, surname, email)
      .then(joke => res.send(joke))
      .catch(err => res.json(err.message));
  },
);

/* GET random joke. */
router.get(
  '/random',
  authenticate,
  (req: express.Request, res: express.Response): void => {
    jokeService
      .sendRequest()
      .then(joke => res.send(joke))
      .catch(err => res.json(err.message));
  },
);

export { router as jokesRouter };
