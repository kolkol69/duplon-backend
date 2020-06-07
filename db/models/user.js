const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  age: { type: Number, default: 18, min: 18 },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
