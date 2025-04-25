import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API docs for Task Management',
    },
    servers: [
      { url: 'http://localhost:3000/api/v1', description: 'Local server' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http', scheme: 'bearer', bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/api/v1/routes/*.ts', './src/api/v1/models/*.ts'],
};

export const generateSwaggerSpec = (): object => swaggerJsdoc(swaggerOptions);
