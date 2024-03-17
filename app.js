const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const specs = require("./src/middlewares/swaggerMiddleware");

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const transactionsRoutes = require("./src/routes/transactionsRoutes");
const reportsRoutes = require("./src/routes/reportsRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/reports", reportsRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

module.exports = app;
