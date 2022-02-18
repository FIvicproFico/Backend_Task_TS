import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import env from '../config/env-config';
import userService from '../services/userService';

const router = express.Router();

interface ILogin {
  username: string;
  email: string;
  password?: string;
}

/* GET login. */
router.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Login!');
});

/* POST data to login. */
router.post('/', (req: express.Request, res: express.Response): void => {
  const { email, password }: ILogin = req.body;
  userService
    .getUserByEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        const token: string = jwt.sign(
          {
            uuid: user.uuid,
            username: user.username,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
          },
          env.accessTokenSecret,
        );
        res.send(token);
      } else {
        res.send('Email or Password incorrect\n');
      }
    })
    .catch(err => res.send(err.message));
});

export { router as loginRouter };
