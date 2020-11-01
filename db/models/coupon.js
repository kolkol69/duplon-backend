const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const couponSchema = new mongoose.Schema({
  cod: { type: String, require: true }, //actual code
  CID: { type: mongoose.ObjectId, require: true }, //unique globally
  TID: { type: mongoose.ObjectId, require: true }, //tenantID ObjectID?? + we have it in tenanat object - redundancy for searching sake
  rnd: { type: Long, require: true }, //random
  pai: { type: Long, require: true }, // paired couponID
  sts: { type: String, require: true }, //status
});
const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
