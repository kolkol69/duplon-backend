const mongoose = require('mongoose')

const tenantSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  activeStatus: { type: Date },
  joinDate: { type: Date, default: Date.now() }
})
const Tenant = mongoose.model('Tenant', tenantSchema)

module.exports = Tenant
