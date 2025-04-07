import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API Documentation for the Task Management Application",
    },
    servers: [
      { url: "http://localhost:3000/api/v1" }
    ],
  },
  apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/models/*.ts"],
};

const specs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app: Express): void => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;