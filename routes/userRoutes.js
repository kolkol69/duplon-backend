const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

const { getAllUsers, createUser, getAllTenantUsers } = userController

router.route('/').get(getAllUsers).post(createUser)
router.route('/:tenantId').get(getAllTenantUsers)
// router
//   .route('/:tenantId/:userId')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser)

module.exports = router
