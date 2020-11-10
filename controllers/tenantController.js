const Tenant = require('../models/tenantModel')
const User = require('../models/userModel')

exports.createTenant = async (req, res) => {
  const tenant = new Tenant(req.body)

  await tenant
    .save()
    .then(({ _id, name }) => {
      const adminUser = new User({
        tenantId: _id,
        access: 'full', // oneOf[full, default]
        login: `${name.replace(/\s/g, '')}_login`,
        password: `${name.replace(/\s/g, '')}_password`
      })

      adminUser
        .save()
        .then(() => res.status(200).json({ status: 'success' }))
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
