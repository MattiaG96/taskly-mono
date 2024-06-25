import express from 'express';

const app = express();
const PORT = 8000;

app.use('/api', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
