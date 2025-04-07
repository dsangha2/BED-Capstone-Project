import { Router, Request, Response } from "express";

const router: Router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Check the server health
 *     responses:
 *       200:
 *         description: Server is healthy
 */
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

export default router;