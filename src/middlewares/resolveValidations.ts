import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const resolveValidations = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).send({
    message: errors.array({ onlyFirstError: true })[0].msg,
    status: 'error',
    data: null,
  });
};

export default resolveValidations;
