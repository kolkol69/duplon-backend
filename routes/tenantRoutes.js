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
  deleteTenant,
  getAllTenantUsers,
  getAllTenantCoupons,
  getAllTenantCouponsTypes
} = tenantController

router.use('/:tenantId/coupons-type', couponTypeRouter)
router.use('/:tenantId/coupons', couponRouter)
router.use('/:tenantId/users', userRouter)

router.route('/users').get(protect, getAllTenantUsers)
router.route('/coupons').get(protect, getAllTenantCoupons)
router.route('/coupons-type').get(protect, getAllTenantCouponsTypes)
router.route('/').get(protect, getAllTenants).post(createTenant)
router.route('/:id').get(getTenant).patch(updateTenant).delete(deleteTenant)
module.exports = router
