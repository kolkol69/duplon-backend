const express = require('express')

const router = express.Router()
const userController = require('../controllers/userController')

const {
  getAllUsers,
  createUser,
  getAllTenantUsers,
  getUser,
  updateUser,
  deleteUser
} = userController

router.route('/').get(getAllUsers)
router.route('/:tenantId').get(getAllTenantUsers).post(createUser)
router.route('/:userId').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router
