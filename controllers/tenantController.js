const Tenant = require('../models/tenantModel')
const User = require('../models/userModel')

const DEFAULT_LIMIT = 10
const DEFAULT_PAGE = 1
const DEFAULT_SORT = '-joinDate'
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

const filter = (filterOptions) => {
  const queryObject = { ...filterOptions }
  const excludeFileds = ['page', 'sort', 'limit', 'fields']

  excludeFileds.forEach((field) => delete queryObject[field])
  return JSON.parse(
    JSON.stringify(queryObject).replace(
      /(gt|gte|lt|gt)/g,
      (match) => `$${match}`
    )
  )
}
const sort = (sortOptions) =>
  sortOptions ? sortOptions.split(',').join(' ') : DEFAULT_SORT

const chooseFields = (fieldOptions) =>
  fieldOptions ? fieldOptions.split(',').join(' ') : '-__v'

const pagination = (query) => {
  const page = +query.page || DEFAULT_PAGE
  const limit = +query.limit || DEFAULT_LIMIT
  const skip = (page - 1) * limit

  return { skip, limit }
}

exports.getAllTenants = async (req, res) => {
  try {
    const queryString = filter(req.query)
    const sortBy = sort(req.query.sort)
    const fields = chooseFields(req.query.fields)
    const { skip, limit } = pagination(req.query)

    const query = Tenant.find(queryString)
      .sort(sortBy)
      .select(fields)
      .skip(skip)
      .limit(limit)

    const tenants = await query

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
