import { Router } from "express";
import * as taskController from "../controllers/taskController";
import { validateRequest } from "../middleware/validate";
import { taskSchema } from "../validation/taskValidation";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/", taskController.getAllTasks);
router.post("/", validateRequest(taskSchema), taskController.createTask);
router.put("/:id", validateRequest(taskSchema), taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.post("/tasks/:projectId/attachments", authenticate, authorize({ hasRole: ["admin", "manager", "user"], allowSameUser: true }),
    upload,
    taskController.attachFileToTask
  );

export default router;