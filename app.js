const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const specs = require("./src/middlewares/swaggerMiddleware");
const passport = require("passport");
const cookieSession = require("cookie-session");

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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Override req.login here
app.use((req, res, next) => {
  req.login = req.logIn = function (user, options, done) {
    req.user = user;
    if (typeof done === "function") {
      done();
    }
  };
  next();
});

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
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    // Assuming the JWT token is already attached to req.user.token by your authentication strategy
    if (req.user && req.user.token) {
      // Set the token in the session cookie
      req.session.token = req.user.token; // Storing the token in the session

      // Optionally, if you need to pass the token directly to the frontend for initial setup
      // Note: Redirecting with the token in the URL is not the recommended approach for production environments
      // due to potential security implications. This is just for demonstration.
      // A safer approach involves handling the token entirely server-side or using HttpOnly cookies.

      // Redirect the user to the frontend with the token as a query parameter
      res.redirect(`http://localhost:3000/success?token=${req.user.token}`);
    } else {
      console.log("No user token found");
      res.redirect("/auth/failure");
    }
  }
);

app.get("/auth/failure", (req, res) => {
  res.send("Something went wrong.");
});

app.get("/protected", isLoggedIn, (req, res) => {
  res.send("Hello");
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send("You have been logged out.");
  });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
