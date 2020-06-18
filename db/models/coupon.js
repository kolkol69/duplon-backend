const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema({
  identifier: { type: String, require: true },
  couponTypeID: { type: String, require: true },
  tenantID: { type: String, require: true },
  couponCode: { type: String, require: true }, //random
  pairedCouponID: { type: String, require: true },
  status: { type: String, require: true },
});
const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
