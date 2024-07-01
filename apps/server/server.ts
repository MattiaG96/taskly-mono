import { config } from 'dotenv';
config({
  path: '../../.env',
});

import express from 'express';
import { seed } from './seed';
import userRouter from './routes/user.route';

const app = express();
const { EXPRESS_PORT } = process.env;

app.use(express.json());

app.use('/api/v1/users', userRouter);

/*app.use('/api', async (req, res) => {
  const response = await seed();
  res.status(200).json(response);
});*/

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(EXPRESS_PORT, () =>
  console.log(`Server listening on port ${EXPRESS_PORT}`),
);
