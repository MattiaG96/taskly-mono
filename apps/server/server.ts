import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import userRouter from './routes/user.route';
import { errorHandling } from './lib/middleware';
import authRoute from './routes/auth.route';
import cookieParser from 'cookie-parser';
import cloudinaryRouter from './routes/cloudinary.route';

const app = express();
const { EXPRESS_PORT } = process.env;

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/image', cloudinaryRouter);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandling);

app.listen(EXPRESS_PORT, () =>
  console.log(`Server listening on port ${EXPRESS_PORT}`),
);
