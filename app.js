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

<<<<<<< Updated upstream
// Middleware do obsługi nieznalezionych adresów URL
=======
require("./src/middlewares/googleAuthMiddleware");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/main",
    failureRedirect: "/auth/failure",
  })
);

app.get("/auth/failure", (req, res) => {
  res.send("something went wrong..");
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send("Hello");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    if (req.session) {
      req.session.destroy(function (err) {
        if (err) {
          console.log(err);
          return next(err);
        }
        // After destroying the session and logging out, send a response or redirect the user
        res.send("You have been logged out.");
      });
    } else {
      // If there's no session, just send a logout confirmation
      res.send("You have been logged out.");
    }
  });
});

>>>>>>> Stashed changes
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
