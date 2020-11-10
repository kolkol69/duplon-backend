const mongoose = require('mongoose')

const tenantSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  activeStatus: { type: Date },
  joinDate: { type: Date, default: new Date() }
})
const Tenant = mongoose.model('Tenant', tenantSchema)

module.exports = Tenant
