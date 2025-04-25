import { Router } from "express";
import * as projectController from "../controllers/projectController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

const router: Router = Router();

// Anyone signed in can list projects
router.get(
  "/",
  authenticate,
  projectController.getAllProjects
);

// Only managers or admins can create a project
router.post(
  "/",
  authenticate,
  authorize({ hasRole: ["manager", "admin"] }),
  projectController.createProject
);

// Managers/admins — or the project’s owner (same user) — can update
router.put(
  "/:id",
  authenticate,
  authorize({ hasRole: ["manager", "admin"], allowSameUser: true }),
  projectController.updateProject
);

// Only managers/admins can delete
router.delete(
  "/:id",
  authenticate,
  authorize({ hasRole: ["manager", "admin"] }),
  projectController.deleteProject
);

export default router;
