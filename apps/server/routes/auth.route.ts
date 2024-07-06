import express from 'express';
import { signin, signout, signup } from '../controllers/auth.controller';

const authRoute = express.Router();

authRoute.post('/signup', signup);
authRoute.post('/signin', signin);
authRoute.get('/signout', signout);

export default authRoute;
