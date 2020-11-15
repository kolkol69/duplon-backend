/* eslint-disable no-unused-vars */
const User = require('../models/userModel')

exports.createUser = async (req, res, data) => {
  // const { login, password, tenantID } = data
  //   try {
  //     const user = new User(data)
  //     await user.save()
  //   } catch (err) {
  //     console.log('error: ', err)
  //   }

  res.status(500).json({
    status: 'success',
    message: 'createUser route is not defined yet!'
  })
}

exports.getAllUsers = async (req, res) => {
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
