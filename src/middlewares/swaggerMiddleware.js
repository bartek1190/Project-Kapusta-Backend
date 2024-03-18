const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Kapusta API",
      version: "1.0.0",
      description: "Finance managing web application API",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Transaction: {
          type: "object",
          properties: {
            date: {
              type: "string",
              format: "date",
              example: "2023-03-30",
            },
            type: {
              type: "string",
              example: "income",
            },
            category: {
              type: "string",
              example: "Salary",
            },
            description: {
              type: "string",
              example: "Monthly salary",
            },
            amount: {
              type: "number",
              example: 5000,
            },
          },
          required: ["date", "type", "category", "description", "amount"],
          example: {
            date: "2023-03-30",
            type: "income",
            category: "Salary",
            description: "Monthly salary",
            amount: 5000,
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerJsDoc = require("swagger-jsdoc");
const specs = swaggerJsDoc(options);

module.exports = specs;
