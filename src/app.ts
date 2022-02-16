import * as path from 'path';

import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { userRouter } from './routes/users.routes';

const app: express.Application = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(
  (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void => {
    next(createError(404));
  },
);

// error handler
app.use((err: any, req: express.Request, res: express.Response): void => {
  // set locals, only providing error in development
  const errorMessage = err.message;
  const description =
    req.app.get('env') === 'development' ? err.stackTrace : {};

  res.status(err.status || 500).json({ errorMessage, description });
});

export { app };
