const mongoose = require("mongoose");
const { Long, Timestamp, ObjectId } = require("mongodb");
const couponHistSchema = new mongoose.Schema({
  CID: { type: mongoose.ObjectId, require: true },//coupon ID
  UID: { type: mongoose.ObjectId, require: true },//user ID 
  tim: { type: Timestamp, require: true },//timestamp of action
  PST: { type: String, require: true },//previous status
  NST: { type: String, require: true },//new status
});
const CouponHistory = mongoose.model("CouponHistory", couponHistSchema);

module.exports = CouponHistory;

