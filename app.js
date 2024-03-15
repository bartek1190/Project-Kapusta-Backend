const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet"); // Dodanie Helmet do poprawy bezpieczeństwa aplikacji

const app = express();

// Importowanie routerów
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const transactionsRoutes = require("./src/routes/transactionsRoutes");
const reportsRoutes = require("./src/routes/reportsRoutes");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

// Routing
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/reports", reportsRoutes);

// Middleware do obsługi nieznalezionych adresów URL
app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

// Centralne miejsce do obsługi błędów
app.use((err, req, res, next) => {
  console.error(err.stack); // Logowanie stack trace dla błędu
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

module.exports = app;
