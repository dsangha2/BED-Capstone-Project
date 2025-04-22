import { Router } from "express";
import authenticate from "../middleware/authenticate";
import authorize    from "../middleware/authorize";
import * as taskController from "../controllers/taskController";
import { validateRequest } from "../middleware/validate";
import { taskSchema } from "../validation/taskValidation";
import { upload } from "../middleware/upload";

const router = Router();

router.get(
  "/", 
  authenticate,                    // require a valid token
  taskController.getAllTasks
);

router.post(
  "/", 
  authenticate,
  authorize({ hasRole: ["admin", "manager"] }), // only managers/admins
  validateRequest(taskSchema),
  taskController.createTask
);

router.put(
  "/:id",
  authenticate,
  authorize({ hasRole: ["admin", "manager"], allowSameUser: true }),
  validateRequest(taskSchema),
  taskController.updateTask
);

router.delete(
  "/:id",
  authenticate,
  authorize({ hasRole: ["admin", "manager"] }),
  taskController.deleteTask
);

router.post(
  "/:projectId/attachments",
  authenticate,
  authorize({ hasRole: ["admin", "manager", "teamMember"], allowSameUser: true }),
  upload,
  taskController.attachFileToTask
);

export default router;
