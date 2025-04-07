import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/taskService";
import { successResponse } from "../models/responseModel";

export const getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tasks = await taskService.fetchAllTasks();
    res.status(200).json(successResponse(tasks, "Tasks retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newTaskId = await taskService.addTask(req.body);
    res.status(201).json(successResponse({ id: newTaskId }, "Task created successfully"));
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await taskService.modifyTask(req.params.id, req.body);
    res.status(200).json(successResponse({}, "Task updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await taskService.removeTask(req.params.id);
    res.status(200).json(successResponse({}, "Task deleted successfully"));
  } catch (error) {
    next(error);
  }
};