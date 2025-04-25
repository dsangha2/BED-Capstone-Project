import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const data = { ...req.body, ...req.params, ...req.query };
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const msg = error.details.map(x => x.message).join(", ");
      res.status(400).json({ error: `Validation error: ${msg}` });
    } else {
      next();
    }
  };
};