import { NextFunction, Request, Response } from 'express';

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
  res
    .status(status)
    .json({
      status: status,
      message: message || defaultMessage,
      extra: error,
    });
};
