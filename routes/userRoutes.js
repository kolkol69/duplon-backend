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
  forgotPassword,
  updatePassword
} = authController

router.post('/login', login)
router.post('/signup', signup)

router.patch('/resetPassword/:token', resetPassword)
router.post('/forgotPassword', forgotPassword)

router.patch('/updateMyPassword', protect, updatePassword)

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe
} = userController

router.patch('/updateMe', protect, updateMe)
router.delete('/deleteMe', protect, deleteMe)

router.route('/').get(getAllUsers).post(createUser)

router
  .route('/:userId')
  .get(getUser)
  .patch(updateUser)
  .delete(protect, restrictTo('admin'), deleteUser)

module.exports = router
