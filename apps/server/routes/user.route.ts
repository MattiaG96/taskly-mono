import express from 'express';
import {
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/user.controller';
import { verifyToken } from '../lib/middleware';

const userRouter = express.Router();

userRouter.get('/:id', verifyToken, getUser);
userRouter.patch('/update/:id', verifyToken, updateUser);
userRouter.delete('/delete/:id', verifyToken, deleteUser);

export default userRouter;
