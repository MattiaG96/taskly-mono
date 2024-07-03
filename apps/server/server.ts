import { config } from 'dotenv';
config({
  path: '../../.env',
});

import express from 'express';
import userRouter from './routes/user.route';
import { errorHandling } from './lib/middleware';

const app = express();
const { EXPRESS_PORT } = process.env;

app.use(express.json());

app.use('/api/v1/users', userRouter);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandling);

app.listen(EXPRESS_PORT, () =>
  console.log(`Server listening on port ${EXPRESS_PORT}`),
);
