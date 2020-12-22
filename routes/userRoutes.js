const express = require('express')

const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const {
  login,
  signup,
  protect,
  restrictTo,
  resetPassword,
  forgotPassword
} = authController

router.post('/login', login)
router.post('/signup', signup)

router.patch('/resetPassword/:token', resetPassword)
router.post('/forgotPassword', forgotPassword)

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
