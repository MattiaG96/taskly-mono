import express from 'express';
import { signup } from '../controllers/auth.controller';

const authRoute = express.Router();

authRoute.post('/signup', signup);

export default authRoute;
