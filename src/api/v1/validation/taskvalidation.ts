import Joi, { ObjectSchema } from "joi";

export const taskSchema: ObjectSchema = Joi.object({
  projectId: Joi.string().required().messages({
    "any.required": "Project ID is required",
    "string.empty": "Project ID cannot be empty"
  }),
  title: Joi.string().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty"
  }),
  description: Joi.string().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty"
  }),
  status: Joi.string().valid("pending", "in-progress", "completed").required().messages({
    "any.required": "Status is required",
    "any.only": "Status must be one of pending, in-progress, or completed"
  }),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});