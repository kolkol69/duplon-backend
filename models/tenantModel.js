const mongoose = require('mongoose')

const tenantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  planStart: { type: Date, default: Date.now }, // when payed plan has be started
  activeStatus: { type: Boolean, default: false }, // if plan is active or not
  joinDate: { type: Date, default: Date.now },
  usedAll: { type: Number, required: true, default: 0 }, // coupons used since joining
  usedLastPeriod: { type: Number, required: true, default: 0 } // coupons used for the last 30 days
})
const Tenant = mongoose.model('Tenant', tenantSchema)

module.exports = Tenant
