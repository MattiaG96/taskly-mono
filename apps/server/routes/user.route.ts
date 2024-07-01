import express from 'express';
import {
  deleteUser,
  getUser,
  updateUser,
  userControllerTest,
} from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/', userControllerTest);
userRouter.get('/:id', getUser);
userRouter.patch('/update/:id', updateUser);
userRouter.delete('/delete/:id', deleteUser);

export default userRouter;
