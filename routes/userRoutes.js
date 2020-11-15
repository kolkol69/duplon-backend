const express = require('express')

const router = express.Router()
const userController = require('../controllers/userController')

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} = userController

router.route('/').get(getAllUsers).post(createUser)
router.route('/:userId').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router
