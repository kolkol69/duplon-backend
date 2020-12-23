const Tenant = require('../models/tenantModel')
const factory = require('./handleFactory')

exports.createTenant = factory.createOne(Tenant)
exports.getAllTenants = factory.getAll(Tenant)
exports.getTenant = factory.getOne(Tenant)
exports.updateTenant = factory.updateOne(Tenant)
exports.deleteTenant = factory.deleteOne(Tenant)
