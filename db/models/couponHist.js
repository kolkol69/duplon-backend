const mongoose = require("mongoose");
const couponHistSchema = new mongoose.Schema(
  {
    couponID: { type: mongoose.ObjectId, require: true }, //coupon ID
    userID: { type: mongoose.ObjectId, require: true }, //user ID
    prevStatus: { type: String, require: true }, //previous status
    newStatus: { type: String, require: true }, //new status
  },
  { timestamps: true } // tells Mongoose to automatically manage createdAt and updatedAt
);
const CouponHistory = mongoose.model("CouponHistory", couponHistSchema);

module.exports = CouponHistory;
