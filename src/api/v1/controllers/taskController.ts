import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/taskService";
import { successResponse } from "../models/responseModel";
import { NewTask } from "../models/taskModel";

export const getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tasks = await taskService.fetchAllTasks();
    res.status(200).json(successResponse(tasks));
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newTaskData = req.body as NewTask;
    const newTaskId = await taskService.addTask(newTaskData);
    res.status(201).json(successResponse({ id: newTaskId }, "Task created"));
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await taskService.modifyTask(req.params.id, req.body);
    res.status(200).json(successResponse({}, "Task updated"));
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await taskService.removeTask(req.params.id);
    res.status(200).json(successResponse({}, "Task deleted"));
  } catch (error) {
    next(error);
  }
};

export const attachFileToTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { projectId } = req.params;
    const file = req.file;
    if (!file) throw new Error("No file provided");

    const url = await taskService.saveTaskAttachment(
      projectId,
      file.originalname,
      file.buffer
    );

    res.status(201).json(successResponse({ url }, "Uploaded"));
  } catch (err) {
    next(err);
  }
};