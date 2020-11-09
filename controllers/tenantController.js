/* eslint-disable no-unused-vars */
const Tenant = require('../db/models/tenant')

exports.createTenant = async (req, res, data) => {
  // const { login, password, tenantID } = data
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
    console.log(err)
  }
  res.status(204).json({
    status: 'success',
    data: null,
  })
}

exports.getTenant = async (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'getTenant route is not defined yet!',
  })
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
