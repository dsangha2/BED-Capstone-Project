import { Task, NewTask } from "../models/taskModel";
import * as taskRepository from "../repositories/taskRepository";
import { db } from "../../../../config/firebaseConfig";

export const fetchAllTasks = async (): Promise<Task[]> => {
  return await taskRepository.findAllTasks();
};

export const addTask = async (taskData: NewTask): Promise<string> => {
  const now = new Date();
  const toSave: Omit<Task, "id"> = {
    ...taskData,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  return taskRepository.createTask(toSave);
};

export const modifyTask = async (id: string, taskData: Partial<Task>): Promise<void> => {
  await taskRepository.updateTask(id, taskData);
};

export const removeTask = async (id: string): Promise<void> => {
  await taskRepository.deleteTask(id);
};

export const saveTaskAttachment = async (
  projectId: string,
  fileName: string,
  buffer: Buffer
): Promise<string> => {
  const docRef = db
    .collection("projects")
    .doc(projectId)
    .collection("attachments")
    .doc();
  await docRef.set({
    fileName,
    data: buffer.toString("base64"),
    uploadedAt: new Date(),
  });

  return `https://example.com/storage/${projectId}/${docRef.id}/${fileName}`;
};