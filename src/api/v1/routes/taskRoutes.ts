import { Router } from "express";
import authenticate from "../middleware/authenticate";
import authorize    from "../middleware/authorize";
import * as taskController from "../controllers/taskController";
import { validateRequest } from "../middleware/validate";
import { taskSchema } from "../validation/taskValidation";
import { upload } from "../middleware/upload";

const router = Router();
/**
 * @openapi
 * /tasks:
 *   get:
 *     summary: Retrieve all tasks
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get(
  "/", 
  authenticate,
  taskController.getAllTasks
);

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTask'
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post(
  "/", 
  authenticate,
  authorize({ hasRole: ["admin", "manager"] }),
  validateRequest(taskSchema),
  taskController.createTask
);

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewTask'
 *     responses:
 *       200:
 *         description: Task updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put(
  "/:id",
  authenticate,
  authorize({ hasRole: ["admin", "manager"], allowSameUser: true }),
  validateRequest(taskSchema),
  taskController.updateTask
);

/**
 * @openapi
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.delete(
  "/:id",
  authenticate,
  authorize({ hasRole: ["admin", "manager"] }),
  taskController.deleteTask
);

/**
 * @openapi
 * /tasks/{projectId}/attachments:
 *   post:
 *     summary: Attach a file to a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               attachment:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post(
  "/:projectId/attachments",
  authenticate,
  authorize({ hasRole: ["admin", "manager", "teamMember"], allowSameUser: true }),
  upload,
  taskController.attachFileToTask
);

export default router;
