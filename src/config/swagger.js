import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Resilient Email Service API",
      version: "1.0.0",
      description: "An API for sending emails with retry, fallback, idempotency, and rate limiting.",
    },
  },
  apis: ["./src/routes/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };
