const express = require('express')

const router = express.Router()
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

router
  .route('/')
  .get(protect, getAllCouponTypes)
  .post(
    protect,
    restrictTo('head', 'admin'),
    setUserTenantIds,
    createCouponType
  )

router
  .route('/:id')
  .get(protect, getCouponType)
  .patch(protect, updateCouponType)
  .delete(protect, restrictTo('head', 'admin'), deleteCouponType)

module.exports = router
