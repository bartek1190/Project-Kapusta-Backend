const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [{ id: String, name: String }],
});

module.exports = mongoose.model("Category", categorySchema);
