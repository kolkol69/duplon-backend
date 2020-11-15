const express = require('express')

const router = express.Router()
const couponTypeController = require('../controllers/couponTypeController')

const {
  getAllCouponTypes,
  createCouponType,
  getCouponType,
  updateCouponType,
  deleteCouponType
} = couponTypeController

router.route('/').get(getAllCouponTypes).post(createCouponType)

router
  .route('/:couponTypeId')
  .get(getCouponType)
  .patch(updateCouponType)
  .delete(deleteCouponType)

module.exports = router
