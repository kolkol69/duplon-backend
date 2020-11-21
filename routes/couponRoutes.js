const express = require('express')

const router = express.Router()
const couponController = require('../controllers/couponController')

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

router.route('/').get(getAllCoupons).post(issueCoupon).delete(deleteAllCoupons)
// redeem should use POST, but navigating thru
// qr code url let us do only GET requests
router.route('/redeem').get(redeemCoupon)
router.route('/generate-qrcode').get(getQrCode)
router
  .route('/:couponId')
  .get(getCoupon)
  .patch(updateCoupon)
  .delete(deleteCoupon)

module.exports = router
