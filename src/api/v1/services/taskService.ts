import { Task } from "../models/taskModel";
import * as taskRepository from "../repositories/taskRepository";

export const fetchAllTasks = async (): Promise<Task[]> => {
  return await taskRepository.findAllTasks();
};

export const addTask = async (taskData: Omit<Task, "id">): Promise<string> => {
  return await taskRepository.createTask(taskData);
};

export const modifyTask = async (id: string, taskData: Partial<Task>): Promise<void> => {
  await taskRepository.updateTask(id, taskData);
};

export const removeTask = async (id: string): Promise<void> => {
  await taskRepository.deleteTask(id);
};