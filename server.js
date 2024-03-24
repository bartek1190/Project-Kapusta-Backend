const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config();

const PORT = process.env.PORT || 4000;
const DB_URI = process.env.DB_URI;

const connectDatabase = async () => {
  try {
    await mongoose.connect(DB_URI, {
      dbName: "kapusta-db",
    });
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

connectDatabase();
