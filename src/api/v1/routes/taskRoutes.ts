import { Router } from "express";
import * as taskController from "../controllers/taskController";
import { validateRequest } from "../middleware/validate";
import { taskSchema } from "../validations/taskValidation";

const router = Router();

router.get("/", taskController.getAllTasks);
router.post("/", validateRequest(taskSchema), taskController.createTask);
router.put("/:id", validateRequest(taskSchema), taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;