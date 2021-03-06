const { isEmpty } = require('ramda')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/apiFeatures')

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.params.id === req.user.id) {
      return next(new AppError('You cannot delete yourself!'))
    }

    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(new AppError('No document found with that id'))
    }
    res.status(200).json({ status: 'success', data: { doc } })
  })

exports.deleteAll = (Model) =>
  catchAsync(async (_req, res, _next) => {
    Model.deleteMany({}, (response) => {
      res.status(200).json({
        status: 'success',
        response
      })
    })
  })

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { history, ...reqBody } = req.body

    if (history) {
      await Model.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { history } },
        { upsert: true, new: true }
      )
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, reqBody, {
      new: true,
      runValidators: true
    })

    if (!doc) {
      return next(new AppError('No document found with that id'))
    }

    res.status(200).json({ status: 'success', data: { data: doc } })
  })

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // [noted] TODO: use selectors for /me route both for client and for user
    const doc = isEmpty(req.params.options)
      ? await Model.findById(req.params.id)
      : await Model.findById(req.params.id).select(req.params.options)

    if (!doc) {
      return next(new AppError('No document found with that id'))
    }

    res.json({
      status: 'success',
      data: { data: doc }
    })
  })

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow nested routes for tenant
    let filter = {}

    // TODO: if we dont check 2nd condition we will get 0 result.
    // needs to be handled better than url check
    if (req.user.tenant.id && req.baseUrl !== '/api/v1/tenants') {
      filter = { tenant: req.user.tenant.id }
    }
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    const doc = await features.query

    if (!doc) {
      return next(new AppError('No document found with that id'))
    }

    res.json({
      status: 'success',
      result: doc.length,
      data: { data: doc }
    })
  })

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { body } = req

    if (req.user.tenant.id) {
      body.tenant = req.user.tenant.id
    }

    const newDoc = await Model.create(body)

    if (!newDoc) {
      return next(new AppError('Document was not created!'))
    }

    res.status(201).json({ status: 'success', data: { data: newDoc } })
  })
