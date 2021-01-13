const express = require('express')

const router = express.Router({ mergeParams: true })
const tenantController = require('../controllers/tenantController')
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

router.route('/').get(getAllTenants).post(createTenant)
router.route('/:id').get(getTenant).patch(updateTenant).delete(deleteTenant)
module.exports = router
