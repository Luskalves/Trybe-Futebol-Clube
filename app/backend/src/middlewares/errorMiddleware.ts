import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  const { name, message } = err;
  switch (name) {
    case 'BadRequest':
      return res.status(400).json(message);
    default:
      return res.status(500).json({ message });
  }
};

export default errorMiddleware;
