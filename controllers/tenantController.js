const Tenant = require('../models/tenantModel')
const User = require('../models/userModel')

exports.checkBody = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({
      status: 'invalid',
      message: 'Missing name or active status'
    })
  }
  next()
}

exports.createTenant = async (req, res) => {
  console.log('req.body', req.body)
  const { name, activeStatus } = req.body

  const tenant = new Tenant({ name, activeStatus })

  await tenant
    .save()
    .then(({ _id }) => {
      const adminUser = new User({
        tenantId: _id,
        access: 'full', // oneOf[full, limitted]
        login: `${name.replace(/\s/g, '')}_login`,
        password: `${name.replace(/\s/g, '')}_password`
      })

      adminUser
        .save()
        .then(() => res.status(200))
        .catch((err) => {
          res.status(400).json({
            status: 'invalid',
            message: `
              User wasn't created!
              Error: ${err}
          `
          })
        })
    })
    .catch((err) => {
      res.status(400).json({
        status: 'invalid',
        message: `
          Tenant wasn't created!
          Error: ${err}
        `
      })
    })
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
