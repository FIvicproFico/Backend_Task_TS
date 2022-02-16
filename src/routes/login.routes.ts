import express from 'express';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

interface IUser {
  username: string;
  email: number;
  password: string;
}

/* GET login. */
router.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Login!');
});

/* POST data to login. */
router.post('/', (req: express.Request, res: express.Response): void => {
  const { username, email, password }: IUser = req.body;
  const env: string = process.env.DB_USERNAME;
  res.json({ username, email, password, env });
});

export { router as loginRouter };
