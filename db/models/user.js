const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  tenantID: { type: String, require: true },
  login: { type: String, require: true },
  password: { type: String, require: true },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
