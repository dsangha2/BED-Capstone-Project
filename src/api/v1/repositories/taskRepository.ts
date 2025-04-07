import { db } from "../../../../config/firebaseConfig";
import { Task } from "../models/taskModel";

const TASKS_COLLECTION = "tasks";

export const findAllTasks = async (): Promise<Task[]> => {
  const snapshot = await db.collection(TASKS_COLLECTION).get();
  const tasks: Task[] = [];
  snapshot.forEach(doc => {
    tasks.push({ id: doc.id, ...(doc.data() as Task) });
  });
  return tasks;
};

export const createTask = async (taskData: Omit<Task, "id">): Promise<string> => {
  const docRef = await db.collection(TASKS_COLLECTION).add(taskData);
  return docRef.id;
};

export const updateTask = async (id: string, taskData: Partial<Task>): Promise<void> => {
  await db.collection(TASKS_COLLECTION).doc(id).update(taskData);
};

export const deleteTask = async (id: string): Promise<void> => {
  await db.collection(TASKS_COLLECTION).doc(id).delete();
};