const mongoose = require("mongoose");
const couponTypeSchema = new mongoose.Schema({
  tenantID: { type: mongoose.ObjectId, require: true },
  name: { type: String, require: true },
  paired: { type: Boolean, require: true },
  html: { type: String, require: false },
});
const CouponType = mongoose.model("CouponType", couponTypeSchema);

module.exports = CouponType;
