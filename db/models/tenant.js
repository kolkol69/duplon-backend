const mongoose = require("mongoose");
const tenantSchema = new mongoose.Schema({
  //identifier: { type: String, require: true }, //_id instead
  name: { type: String, require: true },
  active: { type: Date, require: true },
});
const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
