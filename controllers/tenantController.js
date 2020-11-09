/* eslint-disable no-unused-vars */
const Tenant = require('../db/models/tenant')

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.activeStatus) {
    return res.status(400).json({
      status: 'invalid',
      message: 'Missing name or active status',
    })
  }
  next()
}

exports.createTenant = async (req, res) => {
  // console.log('req.body', req.body)
  // const { name, active } = req.body
  //   try {
  //     const tenant = new Tenant(data)
  //     await tenant.save()
  //   } catch (err) {
  //     console.log('error: ', err)
  //   }

  res.status(500).json({
    status: 'success',
    message: 'createTenant route is not defined yet!',
  })
}

exports.getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find({})
    res.json({
      status: 'success',
      data: tenants,
    })
  } catch (err) {
    res.status(404).json({
      status: 'invalid',
      data: null,
    })
  }
}

exports.getTenant = async (req, res) => {
  try {
    const tenants = await Tenant.findById(req.params.tenantId)
    res.json({
      status: 'success',
      data: tenants,
    })
  } catch (err) {
    res.status(404).json({
      status: 'invalid',
      data: null,
    })
  }
}

exports.deleteTenant = async (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'deleteTenant route is not defined yet!',
  })
}

exports.updateTenant = async (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'updateTenant route is not defined yet!',
  })
}
