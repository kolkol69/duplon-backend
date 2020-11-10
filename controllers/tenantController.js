const Tenant = require('../models/tenantModel')
const User = require('../models/userModel')
const APIFeatures = require('../utils/apiFeatures')

const USER_ACCESS = {
  FULL: 'full',
  DEFAULT: 'default'
}

exports.createTenant = async (req, res) => {
  try {
    await Tenant.create(req.body).then(async ({ _id, name }) => {
      try {
        await User.create({
          tenantId: _id,
          access: USER_ACCESS.FULL,
          login: `${name.replace(/\s/g, '')}_login`,
          password: `${name.replace(/\s/g, '')}_password`
        }).then(() => res.status(200).json({ status: 'success' }))
      } catch (err) {
        res.status(400).json({
          status: 'invalid',
          message: err
        })
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getAllTenants = async (req, res) => {
  try {
    const features = new APIFeatures(Tenant.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const tenants = await features.query

    res.json({
      status: 'success',
      result: tenants.length,
      data: { tenants }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
      data: null
    })
  }
}

exports.getTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.tenantId)

    res.json({
      status: 'success',
      data: { tenant }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      data: null
    })
  }
}

exports.updateTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.tenantId,
      req.body,
      {
        new: true
      }
    )

    res.status(200).json({ status: 'success', data: { tenant } })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

exports.deleteTenant = async (req, res) => {
  try {
    const tenant = await Tenant.findByIdAndDelete(req.params.tenantId)

    res.status(200).json({ status: 'success', data: { tenant } })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}
