const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const specs = require("./src/middlewares/swaggerMiddleware");

const passport = require("passport");
const session = require("express-session");

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const categoriesRoutes = require("./src/routes/categoriesRoutes");
const transactionsRoutes = require("./src/routes/transactionsRoutes");
const reportsRoutes = require("./src/routes/reportsRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(session({ secret: "qwertyuiop" }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/reports", reportsRoutes);

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
    successRedirect: "/protected",
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
        res.send("You have been logged out.");
      });
    } else {
      res.send("You have been logged out.");
    }
  });
});
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
