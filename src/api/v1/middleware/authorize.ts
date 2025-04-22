import { Request, Response, NextFunction } from "express";
import { AuthorizationOptions }          from "../models/authorizationOptions";
import { AuthorizationError }            from "../errors/errors";

export default function authorize(opts: AuthorizationOptions) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { role, uid } = res.locals as { role?: string; uid?: string };
    const { id }        = req.params;

    // Allow user to access their own record
    if (opts.allowSameUser && uid && id === uid) {
      return next();
    }

    if (!role) {
      throw new AuthorizationError("Forbidden: No role found", "ROLE_NOT_FOUND");
    }

    if (opts.hasRole.includes(role as any)) {
      return next();
    }

    throw new AuthorizationError("Forbidden: Insufficient role", "INSUFFICIENT_ROLE");
  };
}