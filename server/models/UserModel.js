const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		lowercase: true,
		maxlength: 250,
		trim: true,
		validate: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	cart: [String],
	createDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
