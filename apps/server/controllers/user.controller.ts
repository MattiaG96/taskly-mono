import { Response, Request, NextFunction } from 'express';
import { db } from '../lib/dbConnect';
import { FindOneAndUpdateOptions, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const collection = db.collection('users');

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const user = await collection.findOne(query);

    if (!user)
      return next({
        status: 404,
        message: 'User not found!',
      });

    res.status(200).json(user);
  } catch (error) {
    next({ status: 500, message: error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const query = { _id: new ObjectId(req.params.id) };
    const data = {
      $set: {
        ...req.body,
        updatedAt: new Date().toISOString(),
      },
    };
    const options: FindOneAndUpdateOptions = {
      returnDocument: 'after',
    };

    const updatedUser = await collection.findOneAndUpdate(query, data, options);
    if (!updatedUser)
      return next({
        status: 500,
        message: 'Something went wrong updating the data',
      });
    updatedUser.password = '***';
    res.status(200).json(updatedUser);
  } catch (error) {
    next({
      status: 500,
      message: error,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    await collection.deleteOne(query);
    res.status(200).json({ message: 'User has been deleted!' });
  } catch (error) {
    next({ status: 500, message: error });
  }
};
