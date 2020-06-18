const mongoose = require("mongoose");
const tenantSchema = new mongoose.Schema({
  identifier: { type: String, require: true },
  name: { type: String, require: true },
});
const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
