import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Reminder API',
      version: '1.0.0',
      description: 'REST API for managing tasks and reminders',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // reads JSDoc comments from route files
};

export const swaggerSpec = swaggerJsdoc(options);
