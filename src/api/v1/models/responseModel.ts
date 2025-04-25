/**
 * @openapi
 * components:
 *   schemas:
 *     ApiResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         data:
 *           type: object
 *         message:
 *           type: string
 *         error:
 *           type: string
 */
export interface ApiResponse<T> {
    status: string;
    data?: T;
    message?: string;
    error?: string;
  }
  
  export const successResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
    status: "success",
    data,
    message,
  });
  
  export const errorResponse = (message: string): ApiResponse<null> => ({
    status: "error",
    error: message,
  });
  