const express = require('express')

const router = express.Router()
const tenantController = require('../controllers/tenantController')

const {
  getTenant,
  getAllTenants,
  createTenant,
  updateTenant,
  deleteTenant,
  getAllTenantUsers,
  getAllTenantCoupons,
  getAllTenantCouponsTypes,
} = tenantController

router.route('/users').get(getAllTenantUsers)
router.route('/coupons').get(getAllTenantCoupons)
router.route('/coupons-type').get(getAllTenantCouponsTypes)
router.route('/').get(getAllTenants).post(createTenant)
router
  .route('/:tenantId')
  .get(getTenant)
  .patch(updateTenant)
  .delete(deleteTenant)

module.exports = router
