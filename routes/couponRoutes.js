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
  // getQrCode,
  deleteAllCoupons
} = couponController
// redeem should use POST, but navigating thru
// qr code url let us do only GET requests

// router.route('/generate-qrcode').get(getQrCode)

// Protected Routes
router.use(protect)
router.route('/redeem').get(redeemCoupon)

router
  .route('/')
  .get(getAllCoupons)
  .post(issueCoupon)
  .delete(restrictTo('head', 'admin'), deleteAllCoupons)

router
  .route('/:id')
  .get(getCoupon)
  .patch(updateCoupon)
  .delete(restrictTo('head', 'admin'), deleteCoupon)

module.exports = router
