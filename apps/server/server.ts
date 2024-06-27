import { config } from 'dotenv';
import express from 'express';
config({
  path: '../../.env',
});
import { seed } from './seed';

const app = express();
const { EXPRESS_PORT } = process.env;

app.use('/api', async (req, res) => {
  const response = await seed();
  res.status(200).json(response);
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(EXPRESS_PORT, () => console.log(`Server listening on port ${EXPRESS_PORT}`));
