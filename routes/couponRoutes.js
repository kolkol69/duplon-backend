const express = require('express')

const router = express.Router()
const couponController = require('../controllers/couponController')

const {
  getAllCoupons,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon
} = couponController

router.route('/').get(getAllCoupons).post(createCoupon)

router
  .route('/:couponId')
  .get(getCoupon)
  .patch(updateCoupon)
  .delete(deleteCoupon)

module.exports = router
