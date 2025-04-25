/**
 * @openapi
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - id
 *         - projectId
 *         - title
 *         - description
 *         - status
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *         projectId:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - in-progress
 *             - completed
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     NewTask:
 *       type: object
 *       required:
 *         - projectId
 *         - title
 *         - description
 *       properties:
 *         projectId:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 */
export interface Task {
    id: string;
    projectId: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    createdAt: Date;
    updatedAt: Date;
  }

  export type NewTask = Omit<Task, "id" | "status" | "createdAt" | "updatedAt">;