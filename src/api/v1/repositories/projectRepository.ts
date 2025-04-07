import { db } from "../../../../config/firebaseConfig";
import { Project } from "../models/projectModel";

const PROJECTS_COLLECTION = "projects";

export const findAllProjects = async (): Promise<Project[]> => {
  const snapshot = await db.collection(PROJECTS_COLLECTION).get();
  const projects: Project[] = [];
  snapshot.forEach(doc => {
    projects.push({ id: doc.id, ...(doc.data() as Project) });
  });
  return projects;
};

export const createProject = async (projectData: Omit<Project, "id">): Promise<string> => {
  const docRef = await db.collection(PROJECTS_COLLECTION).add(projectData);
  return docRef.id;
};

export const updateProject = async (id: string, projectData: Partial<Project>): Promise<void> => {
  await db.collection(PROJECTS_COLLECTION).doc(id).update(projectData);
};

export const deleteProject = async (id: string): Promise<void> => {
  await db.collection(PROJECTS_COLLECTION).doc(id).delete();
};