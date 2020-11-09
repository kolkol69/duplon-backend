const mongoose = require('mongoose')

const { Schema, SchemaTypes } = mongoose
const { ObjectId } = SchemaTypes
const couponHistSchema = new Schema(
	{
		couponID: { type: ObjectId, require: true }, //coupon ID
		userID: { type: ObjectId, require: true }, //user ID
		prevStatus: { type: String, require: true }, //previous status
		newStatus: { type: String, require: true }, //new status
	},
	{ timestamps: true } // tells Mongoose to automatically manage createdAt and updatedAt
)
const CouponHistory = mongoose.model('CouponHistory', couponHistSchema)

module.exports = CouponHistory
