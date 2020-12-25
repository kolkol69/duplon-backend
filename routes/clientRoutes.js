const express = require('express')

const router = express.Router()
const clientController = require('../controllers/clientController')
const clientAuthController = require('../controllers/clientAuthController')

const {
  login,
  signup,
  protect,
  restrictTo,
  resetPassword,
  forgotPassword,
  updatePassword
} = clientAuthController

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
  deleteMe,
  getMe
} = clientController

// Protected Routes
router.use(protect)

router.get('/me', getMe, getUser)
router.patch('/updateMe', updateMe)
router.delete('/deleteMe', deleteMe)

router.route('/').get(getAllUsers).post(createUser)

router
  .route('/:id')
  .get(restrictTo('head', 'admin'), getUser)
  .patch(restrictTo('head', 'admin'), updateUser)
  .delete(restrictTo('admin'), deleteUser)

module.exports = router
