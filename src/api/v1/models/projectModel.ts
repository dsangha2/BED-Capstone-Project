/**
 * @openapi
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - startDate
 *         - endDate
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 */
export interface Project {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
  }