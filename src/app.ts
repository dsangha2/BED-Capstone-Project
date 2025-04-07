import express, { Express } from "express";
import setupSwagger from "../config/swagger";
import healthRoutes from "./api/v1/routes/healthRoutes";
import projectRoutes from "./api/v1/routes/projectRoutes";
import taskRoutes from "./api/v1/routes/taskRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";

const app: Express = express();

// Parse JSON request bodies
app.use(express.json());

// Health check endpoint
app.use("/api/v1/health", healthRoutes);

// Mount CRUD routes
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/users", userRoutes);

// Setup Swagger documentation (available at /api-docs)
setupSwagger(app);

// Global error handling middleware
app.use(errorHandler);

export default app;