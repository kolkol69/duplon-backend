/* eslint-disable no-unused-vars */
const { isEmpty } = require('ramda')
const Tenant = require('../db/models/tenant')
const User = require('../db/models/user')

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.activeStatus) {
    return res.status(400).json({
      status: 'invalid',
      message: 'Missing name or active status'
    })
  }
  next()
}

exports.checkIfTenantUniq = async (req, res, next) => {
  const tenant = await Tenant.find({
    name: req.body.name
  })

  if (!isEmpty(tenant)) {
    return res.status(400).json({
      status: 'invalid',
      message: 'Tenant with the same name already exists!'
    })
  }
  next()
}

exports.createTenant = async (req, res) => {
  console.log('req.body', req.body)
  const { name, activeStatus } = req.body

  try {
    const tenant = new Tenant({ name, activeStatus })

    await tenant.save()
    const adminUser = new User({
      tenantId: tenant._id,
      access: 'full', // oneOf[full, limitted]
      login: `${name.replace(/\s/g, '')}_login`,
      password: `${name.replace(/\s/g, '')}_password`
    })

    await adminUser.save()
  } catch (err) {
    res.status(400).json({
      status: 'invalid',
      message: `
      Tenant wasn't created!
      Error: ${err}
      `
    })
  }
}

exports.getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find({})

    res.json({
      status: 'success',
      data: tenants
    })
  } catch (err) {
    res.status(404).json({
      status: 'invalid',
      data: null
    })
  }
}

exports.getTenant = async (req, res) => {
  try {
    const tenants = await Tenant.findById(req.params.tenantId)

    res.json({
      status: 'success',
      data: tenants
    })
  } catch (err) {
    res.status(404).json({
      status: 'invalid',
      data: null
    })
  }
}

exports.deleteTenant = async (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'deleteTenant route is not defined yet!'
  })
}

exports.updateTenant = async (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'updateTenant route is not defined yet!'
  })
}
