const User = require('../models/userModel')

exports.createUser = async (req, res) => {
  try {
    await User.create({
      ...req.params,
      ...req.body
    }).then((response) =>
      res.status(200).json({ status: 'success', data: { response } })
    )
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getAllUsers = async (_, res) => {
  try {
    const users = await User.find()

    return res.json({
      status: 'success',
      result: users.length,
      data: users
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error
    })
  }
  res.status(204).json({
    status: 'success',
    data: null
  })
}

exports.getAllTenantUsers = async (req, res) => {
  try {
    const users = await User.find({
      tenantId: req.params.tenantId
    })

    res.json({
      status: 'success',
      result: users.length,
      data: users
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error
    })
  }
}

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)

    res.json({
      status: 'success',
      data: { user }
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      data: null,
      error
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true
    })

    res.status(200).json({ status: 'success', data: { user } })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId)

    res.status(200).json({ status: 'success', data: { user } })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error
    })
  }
}
