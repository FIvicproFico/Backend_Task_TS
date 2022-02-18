import express from 'express';

import authenticateJWT from '../middlewares/authentication';

import { asyncRoute } from '../utilities/asyncRoute';

const router = express.Router();

/* GET users listing. */
router.get(
  '/',
  authenticateJWT,
  (req: express.Request, res: express.Response): void => {
    res.send('Hello Users!');
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
