const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Brak tokena autoryzacyjnego" });
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
    res.status(401).json({ message: "Nieprawidłowy token" });
  }
};

module.exports = authMiddleware;
