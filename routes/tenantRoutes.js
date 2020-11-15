const express = require('express')

const router = express.Router()
const tenantController = require('../controllers/tenantController')

const {
  getTenant,
  getAllTenants,
  createTenant,
  updateTenant,
  deleteTenant,
  getAllTenantUsers
} = tenantController

router.route('/users').get(getAllTenantUsers)
router.route('/').get(getAllTenants).post(createTenant)
router
  .route('/:tenantId')
  .get(getTenant)
  .patch(updateTenant)
  .delete(deleteTenant)

module.exports = router
