const mongoose = require("mongoose");
const couponTypeSchema = new mongoose.Schema({
  identifier: { type: String, require: true },
  tenantID: { type: String, require: true },
  name: { type: String, require: true },
  paired: { type: Boolean, require: true },
});
const CouponType = mongoose.model("CouponType", couponTypeSchema);

module.exports = CouponType;
