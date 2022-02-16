import express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Jokes!');
});

export { router as jokesRouter };
