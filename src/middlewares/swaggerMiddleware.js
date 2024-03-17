const swaggerJsDoc = require("swagger-jsdoc");

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
  },
  apis: ["../routes/*.js"],
};

const specs = swaggerJsDoc(options);

module.exports = specs;
