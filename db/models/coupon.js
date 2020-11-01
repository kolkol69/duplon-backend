const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema({
  code: { type: String, require: true }, //actual code
  couponID: { type: mongoose.ObjectId, require: true }, //unique globally
  tenantID: { type: mongoose.ObjectId, require: true }, //tenantID ObjectID?? + we have it in tenanat object - redundancy for searching sake
  random: { type: Long, require: true }, //random
  pairedCouponID: { type: Long, require: true }, // paired couponID
  status: { type: String, require: true }, //status
});
const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
