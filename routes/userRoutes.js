const express = require('express')

const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const { signup, login } = authController

router.post('/signup', signup)
router.post('/login', login)

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
