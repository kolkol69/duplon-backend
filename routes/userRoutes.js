const express = require('express')

const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const { signup, login, protect, restrictTo } = authController

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
router
  .route('/:userId')
  .get(getUser)
  .patch(updateUser)
  .delete(protect, restrictTo('admin'), deleteUser)

module.exports = router
