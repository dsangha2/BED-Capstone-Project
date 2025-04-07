import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import { successResponse } from "../models/responseModel";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userService.fetchAllUsers();
    res.status(200).json(successResponse(users, "Users retrieved successfully"));
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newUserId = await userService.addUser(req.body);
    res.status(201).json(successResponse({ id: newUserId }, "User created successfully"));
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await userService.modifyUser(req.params.id, req.body);
    res.status(200).json(successResponse({}, "User updated successfully"));
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await userService.removeUser(req.params.id);
    res.status(200).json(successResponse({}, "User deleted successfully"));
  } catch (error) {
    next(error);
  }
};