import express from 'express';

import authenticateJWT from '../middlewares/authentication';
import userService from '../services/userService';

import { asyncRoute } from '../utilities/asyncRoute';

interface IUser {
  id: number;
  uuid: string;
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const router = express.Router();

/* GET users listing. */
router.get(
  '/',
  authenticateJWT,
  (_: express.Request, res: express.Response): void => {
    // console.log(`From Middleware: ${JSON.stringify(res.locals.user.role)}`);
    userService
      .getUsersQuery()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.json(err.message));
    // console.log(`From Middleware: ${JSON.stringify(res.locals.user.role)}`);
  },
);

/* GET user with id. */
router.get(
  '/:id',
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void => {
    const id: number = parseInt(req.params.id, 10);
    if (id) {
      res.locals.id = id;
      next();
    } else next('route');
  },
  (req: express.Request, res: express.Response): void => {
    userService
      .getUserByID(res.locals.id)
      .then(user => res.json(user))
      .catch(err => res.json(err.message));
  },
);

/* POST new user. */
router.post(
  '/',
  authenticateJWT,
  (req: express.Request, res: express.Response): void => {
    const { username, password, name, surname, email, role }: IUser = req.body;
    userService
      .AddNewUser(username, password, name, surname, email, role)
      .then(() => res.send(`User ${username} added !`))
      .catch(err => res.json(err.message));
  },
);

/* PUT new username. */
router.put(
  '/:id',
  authenticateJWT,
  (req: express.Request, res: express.Response): void => {
    userService
      .updateUsername(parseInt(req.params.id, 10), req.body.username)
      .then(() => res.send(`Username updated to ${req.body.username} !`))
      .catch(err => res.json(err.message));
  },
);

/* DELETE user. */
router.delete(
  '/:id',
  authenticateJWT,
  (req: express.Request, res: express.Response) => {
    const id: number = parseInt(req.params.id, 10);
    userService
      .deleteUser(id)
      .then(() => res.send(`User ${id} deleted !`))
      .catch(err => res.json(err.message));
  },
);

/* GET Error. */
router.get(
  '/error',
  asyncRoute(
    // eslint-disable-next-line require-await
    async (req: express.Request, res: express.Response): Promise<void> => {
      res.status(500);
      res.send('Hello Error!');
    },
  ),
);

export { router as userRouter };
