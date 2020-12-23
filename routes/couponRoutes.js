const express = require('express')

const router = express.Router()
const couponController = require('../controllers/couponController')
const authController = require('../controllers/authController')

const { protect, restrictTo } = authController
const {
  getAllCoupons,
  issueCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
  redeemCoupon,
  getQrCode,
  deleteAllCoupons
} = couponController

router
  .route('/')
  .get(protect, getAllCoupons)
  .post(protect, issueCoupon)
  .delete(protect, restrictTo('head', 'admin'), deleteAllCoupons)
// redeem should use POST, but navigating thru
// qr code url let us do only GET requests
router.route('/redeem').get(redeemCoupon)
router.route('/generate-qrcode/:id').get(getQrCode)
router
  .route('/:id')
  .get(protect, getCoupon)
  .patch(protect, updateCoupon)
  .delete(protect, restrictTo('head', 'admin'), deleteCoupon)

module.exports = router
