const express = require('express')

const router = express.Router()
const tenantController = require('../controllers/tenantController')
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

router.route('/users').get(protect, getAllTenantUsers)
router.route('/coupons').get(protect, getAllTenantCoupons)
router.route('/coupons-type').get(protect, getAllTenantCouponsTypes)
router.route('/').get(protect, getAllTenants).post(createTenant)
router
  .route('/:tenantId')
  .get(getTenant)
  .patch(updateTenant)
  .delete(deleteTenant)

module.exports = router
