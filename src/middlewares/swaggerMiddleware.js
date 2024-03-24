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
        url: "https://vast-plum-camel-vest.cyclic.app",
      },
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
        IncomeTransaction: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "The auto-generated id of the user",
            },
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
            user: {
              type: "string",
              description: "Id of the user that transaction belongs to",
            },
          },
          required: ["date", "type", "category", "description", "amount"],
          example: {
            _id: "65f874410a288365085a5608",
            date: "2023-03-30",
            type: "income",
            category: "Salary",
            description: "Monthly salary",
            amount: 5000,
            user: "65f4a4b12e22a2c00cd7d50b",
          },
        },
        ExpensesTransaction: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "The auto-generated id of the user",
            },
            date: {
              type: "string",
              format: "date",
              example: "2023-03-30",
            },
            type: {
              type: "string",
              example: "expenses",
            },
            category: {
              type: "string",
              example: "Products",
            },
            description: {
              type: "string",
              example: "Apples",
            },
            amount: {
              type: "number",
              example: 5000,
            },
            user: {
              type: "string",
              description: "Id of the user that transaction belongs to",
            },
          },
          required: ["date", "type", "category", "description", "amount"],
          example: {
            _id: "65f874410a288365085a5608",
            date: "2023-03-30",
            type: "expenses",
            category: "Products",
            description: "Apples",
            amount: 5000,
            user: "65f4a4b12e22a2c00cd7d50b",
          },
        },
        IncomeCategories: {
          type: "array",
          items: {
            type: "string",
            example: ["Salary", "Add. Income"],
          },
        },
        ExpensesCategories: {
          type: "array",
          items: {
            type: "string",
            example: [
              "Transport",
              "Products",
              "Health",
              "Alcohol",
              "Entertainment",
              "Housing",
              "Technique",
              "Communal, communication",
              "Sports, hobbies",
              "Education",
              "Other",
            ],
          },
        },
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "The auto-generated id of the user",
            },
            email: {
              type: "string",
              description: "User email",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "Hashed user password",
            },
            balance: {
              type: "number",
              description: "User balance",
            },
            token: {
              type: "string",
              description: "JWT token, generated for logged in user",
            },
          },
          required: ["email", "password"],
          example: {
            _id: "65f4a4b12e22a2c00cd7d50b",
            email: "test@gmail.com",
            password: "test123",
            balance: 0,
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Zjg3NG0MTM4MTY0ODA1NjZlNWQxMCIsImlhdCI6MTcxMDc4MjYzMSwiZXhwIjxNzEwNzg2MjMxfQ.RTrK1ECvbKs6J8r75kMuWQ1br55LX0h0vc_6_VCGvo",
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
