import express from 'express';

import authenticateJWT from '../middlewares/authentication';
import userService from '../services/userService';

import { asyncRoute } from '../utilities/asyncRoute';

const router = express.Router();

/* GET users listing. */
router.get(
  '/',
  authenticateJWT,
  (req: express.Request, res: express.Response): void => {
    console.log(`From Middleware: ${JSON.stringify(res.locals.user.role)}`);
    // userService
    //   .getUsers()
    //   .then(users => {
    //     res.json(users);
    //   })
    //   .catch(err => res.json(err.message));
    userService
      .getUsersQuery()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.json(err.message));
    console.log(`From Middleware: ${JSON.stringify(res.locals.user.role)}`);
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

/* GET Error. */
router.get(
  '/error',
  asyncRoute(
    // eslint-disable-next-line require-await
    async (req: express.Request, res: express.Response): Promise<void> => {
      res.status(500);
      res.send('Hello world!');
    },
  ),
);

export { router as userRouter };
