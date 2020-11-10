const Tenant = require('../models/tenantModel')
const User = require('../models/userModel')

const DEFAULT_LIMIT = 100
const DEFAULT_PAGE = 1
const DEFAULT_SORT = '-joinDate'
const DEFAULT_LIMIT_FIELDS = '-__v'
const USER_ACCESS = {
  FULL: 'full',
  DEFAULT: 'default'
}

class APIFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    const queryObject = { ...this.queryString }
    const excludeFileds = ['page', 'sort', 'limit', 'fields']

    excludeFileds.forEach((field) => delete queryObject[field])
    const normalizedQuery = JSON.stringify(queryObject).replace(
      /(gt|gte|lt|gt)/g,
      (match) => `$${match}`
    )

    this.query = this.query.find(JSON.parse(normalizedQuery))

    return this
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')

      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort(DEFAULT_SORT)
    }
    return this
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ')

      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select(DEFAULT_LIMIT_FIELDS)
    }
    return this
  }

  paginate() {
    const page = +this.queryString.page || DEFAULT_PAGE
    const limit = +this.queryString.limit || DEFAULT_LIMIT
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)

    return this
  }
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
