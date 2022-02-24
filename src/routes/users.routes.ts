import express from 'express';

import authenticateJWT from '../middlewares/authentication';
import authorize from '../middlewares/authorization';
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
  addressId: number;
  createdAt: Date;
  updatedAt: Date;
}

const router = express.Router();

/* GET users listing. */
router.get(
  '/',
  authenticateJWT,
  (_: express.Request, res: express.Response): void => {
    console.log('This first!');
    userService
      .getUsers()
      .then(users => {
        res.json(users);
        console.log('And finnaly this!');
      })
      .catch(err => res.json(err.message));
    console.log('Than this!');
  },
);

/* Test. */
router.get(
  '/test',
  authenticateJWT,
  async (_: express.Request, res: express.Response): Promise<void> => {
    const user = await userService.getUserById(23);
    res.json(user);
  },
);

/* GET user with id. */
router.get(
  '/:id',
  authenticateJWT,
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
  (_: express.Request, res: express.Response): void => {
    userService
      .getUserById(res.locals.id)
      .then(user => {
        userService
          .getUserAddressQuery(user.addressId)
          .then(address => {
            const userInfo = {
              ...user,
              ...address,
            };
            res.json(userInfo);
          })
          .catch(err => console.error(err));
      })
      .catch(err => res.json(err.message));
  },
);

/* POST new user. */
router.post(
  '/',
  authenticateJWT,
  authorize,
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
  authorize,
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
  authorize,
  (req: express.Request, res: express.Response): void => {
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
    async (_: express.Request, res: express.Response): Promise<void> => {
      res.status(500);
      res.send('Hello Error!');
    },
  ),
);

export { router as userRouter };
