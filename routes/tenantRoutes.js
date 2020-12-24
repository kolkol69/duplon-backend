const express = require('express')

const router = express.Router({ mergeParams: true })
const tenantController = require('../controllers/tenantController')
const couponTypeRouter = require('./couponTypeRoutes')
const couponRouter = require('./couponRoutes')
const userRouter = require('./userRoutes')
const authController = require('../controllers/authController')

const { protect } = authController

const {
  getTenant,
  getAllTenants,
  createTenant,
  updateTenant,
  deleteTenant
} = tenantController

// Protected Routes
router.use(protect)

router.use('/:tenantId/coupons-type', couponTypeRouter)
router.use('/:tenantId/coupons', couponRouter)
router.use('/:tenantId/users', userRouter)

router.route('/').get(getAllTenants).post(createTenant)
router.route('/:id').get(getTenant).patch(updateTenant).delete(deleteTenant)
module.exports = router
