const express = require('express')

const router = express.Router()
const tenantController = require('../controllers/tenantController')

const {
  getTenant,
  getAllTenants,
  createTenant,
  checkBody,
  updateTenant,
  deleteTenant,
  checkIfTenantUniq
} = tenantController

router
  .route('/')
  .get(getAllTenants)
  .post(checkBody, checkIfTenantUniq, createTenant)
router
  .route('/:tenantId')
  .get(getTenant)
  .patch(updateTenant)
  .delete(deleteTenant)

module.exports = router
