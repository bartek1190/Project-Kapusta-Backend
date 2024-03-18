const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      status: "failure",
      code: 401,
      message: "no token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    if (error.message === "jwt expired") {
      await User.updateOne({ token }, { token: null });
    }
    res.status(401).json({
      status: "failure",
      code: 401,
      message: "invalid token",
    });
  }
};

module.exports = authMiddleware;
