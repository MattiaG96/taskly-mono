import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface ClientError<Error> {
  status: number;
  message?: string;
  error?: Error;
}

export const errorHandling = (
  err: ClientError<Error>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const defaultMessage =
    "We're having technical issues. Please try again later.";

  const { status, message, error } = err;
  if (error) {
    console.log(error);
  }
  res.status(status).json({
    status: status,
    message: message || defaultMessage,
    extra: error,
  });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.taskly_token;

  if (!token) return next({ status: 401, message: 'Unauthorized' });

  jwt.verify(token, process.env.AUTH_SECRET ?? '', (error: any, user: any) => {
    if (error) return next({ status: 403, message: 'Forbidden' });
    req.body.user = user;
    next();
  });
};
