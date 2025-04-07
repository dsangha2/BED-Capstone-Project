import { Request, Response, NextFunction } from "express";
import * as projectService from "../services/projectService";
import { successResponse } from "../models/responseModel";

export const getAllProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const projects = await projectService.fetchAllProjects();
    res.status(200).json(successResponse(projects, "Projects retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newProjectId = await projectService.addProject(req.body);
    res.status(201).json(successResponse({ id: newProjectId }, "Project created successfully"));
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await projectService.modifyProject(req.params.id, req.body);
    res.status(200).json(successResponse({}, "Project updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await projectService.removeProject(req.params.id);
    res.status(200).json(successResponse({}, "Project deleted successfully"));
  } catch (error) {
    next(error);
  }
};