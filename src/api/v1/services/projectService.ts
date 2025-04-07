import { Project } from "../models/projectModel";
import * as projectRepository from "../repositories/projectRepository";

export const fetchAllProjects = async (): Promise<Project[]> => {
  return await projectRepository.findAllProjects();
};

export const addProject = async (projectData: Omit<Project, "id">): Promise<string> => {
  return await projectRepository.createProject(projectData);
};

export const modifyProject = async (id: string, projectData: Partial<Project>): Promise<void> => {
  await projectRepository.updateProject(id, projectData);
};

export const removeProject = async (id: string): Promise<void> => {
  await projectRepository.deleteProject(id);
};