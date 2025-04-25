import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import authenticate from "../src/api/v1/middleware/authenticate";
import authorize from "../src/api/v1/middleware/authorize";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { auth } from "../config/firebaseConfig";
import { AuthenticationError, AuthorizationError } from "../src/api/v1/errors/errors";

jest.mock("../config/firebaseConfig", () => ({
  auth: { verifyIdToken: jest.fn() },
}));

describe("validateRequest Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  const schema = Joi.object({ name: Joi.string().required() });

  beforeEach(() => {
    req = { body: {}, params: {}, query: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it("passes valid input", () => {
    req.body = { name: "X" };
    validateRequest(schema)(req as any, res as any, next);
    expect(next).toHaveBeenCalled();
  });

  it("rejects invalid input", () => {
    req.body = {};
    validateRequest(schema)(req as any, res as any, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: expect.stringContaining("Validation error") });
    expect(next).not.toHaveBeenCalled();
  });
});

describe("authenticate Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { headers: {} };
    res = { locals: {} };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("throws if no token", async () => {
    await expect(authenticate(req as any, res as any, next)).rejects.toThrow(AuthenticationError);
  });

  it("calls next() if token is valid", async () => {
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "u1", role: "manager" });
    req.headers = { authorization: "Bearer valid" };

    await authenticate(req as any, res as any, next);
    expect(auth.verifyIdToken).toHaveBeenCalledWith("valid");
    expect(res.locals).toMatchObject({ uid: "u1", role: "manager" });
    expect(next).toHaveBeenCalled();
  });
});

describe("authorize Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { params: {} };
    res = { locals: {} };
    next = jest.fn();
  });

  it("allows matching role", () => {
    res.locals = { role: "admin" };
    authorize({ hasRole: ["admin"] })(req as any, res as any, next);
    expect(next).toHaveBeenCalled();
  });

  it("allows same user when allowed", () => {
    res.locals = { uid: "u1", role: "user" };
    req.params = { id: "u1" };
    authorize({ hasRole: ["admin"], allowSameUser: true })(req as any, res as any, next);
    expect(next).toHaveBeenCalled();
  });

  it("throws if no role", () => {
    expect(() => authorize({ hasRole: ["admin"] })(req as any, res as any, next))
      .toThrow(AuthorizationError);
  });

  it("throws if insufficient role", () => {
    res.locals = { role: "user" };
    expect(() => authorize({ hasRole: ["admin"] })(req as any, res as any, next))
      .toThrow(AuthorizationError);
  });
});
