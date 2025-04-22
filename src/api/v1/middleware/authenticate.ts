import { Request, Response, NextFunction } from "express";
import { auth, db } from "../../../../config/firebaseConfig";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { AuthenticationError } from "../errors/errors";

export default async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const header = req.headers.authorization;
  const token  = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) {
    throw new AuthenticationError("Unauthorized: No token provided", "TOKEN_NOT_FOUND");
  }

  try {
    const decoded: DecodedIdToken = await auth.verifyIdToken(token);
    res.locals.uid  = decoded.uid;
    res.locals.role = decoded.role;
    next();
  } catch (err: unknown) {
    throw new AuthenticationError(
      `Unauthorized: ${ (err as Error).message }`,
      "TOKEN_INVALID"
    );
  }
}
