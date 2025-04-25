export interface Task {
    id: string;
    projectId: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    createdAt: Date;
    updatedAt: Date;
  }

  export type NewTask = Omit<Task, "id" | "status" | "createdAt" | "updatedAt">;