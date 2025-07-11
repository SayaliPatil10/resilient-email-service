export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Resilient Email Service API",
      version: "1.0.0",
      description: "Send emails using a retryable, fallback-based architecture with idempotency and queueing.",
    },
    servers: [
      {
        url: "https://zkmvf4vzs8.execute-api.ap-south-1.amazonaws.com/Prod",
        description: "Production server",
      },
    ],
    paths: {
      "/api/email": {
        post: {
          summary: "Send an email",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    to: { type: "string", example: "test@example.com" },
                    subject: { type: "string", example: "Hello World" },
                    body: { type: "string", example: "This is a test email" },
                    idempotencyKey: { type: "string", example: "abc-123" },
                  },
                  required: ["to", "subject", "body", "idempotencyKey"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Email accepted for delivery",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                    },
                  },
                },
              },
            },
            400: {
              description: "Missing required fields",
            },
            429: {
              description: "Rate limit exceeded",
            },
            500: {
              description: "Internal server error",
            },
          },
        },
      },
    },
  },
  apis: [],
};
