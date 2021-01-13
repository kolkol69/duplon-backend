const express = require('express')

const router = express.Router({ mergeParams: true })
const couponTypeController = require('../controllers/couponTypeController')
const authController = require('../controllers/authController')

const { protect, restrictTo } = authController
const {
  getAllCouponTypes,
  createCouponType,
  getCouponType,
  updateCouponType,
  deleteCouponType,
  setUserTenantIds
} = couponTypeController

// Protected Routes
router.use(protect)
router
  .route('/')
  .get(getAllCouponTypes)
  .post(restrictTo('head', 'admin'), setUserTenantIds, createCouponType)

router
  .route('/:id')
  .get(getCouponType)
  .patch(updateCouponType)
  .delete(restrictTo('head', 'admin'), deleteCouponType)

module.exports = router
