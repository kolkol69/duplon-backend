/* eslint-disable no-unused-vars */
const User = require('../db/models/user')

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
    message: 'createUser route is not defined yet!',
  })
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.json({
      status: 'success',
      data: users,
    })
  } catch (err) {
    console.log(err)
  }
  res.status(204).json({
    status: 'success',
    data: null,
  })
}

exports.getAllTenantUsers = async (req, res) => {
  try {
    const users = await User.find({
      tenantID: req.params.tenantId,
    })

    res.json({
      status: 'success',
      data: users,
    })
  } catch (message) {
    res.status(404).json({
      status: 'error',
      message,
    })
  }
}

exports.getUser = async (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'getUser route is not defined yet!',
  })
}

exports.deleteUser = async (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'deleteUser route is not defined yet!',
  })
}

exports.updateUser = async (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'updateUser route is not defined yet!',
  })
}
