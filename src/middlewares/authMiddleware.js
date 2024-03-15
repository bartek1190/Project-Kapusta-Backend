const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Pobranie tokena z nagłówka
  if (!token) {
    return res.status(401).json({ message: "Brak tokena autoryzacyjnego" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Przypisanie dekodowanego użytkownika do req.user
    next();
  } catch (error) {
    res.status(401).json({ message: "Nieprawidłowy token" });
  }
};

module.exports = authMiddleware;
