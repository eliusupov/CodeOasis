const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
	userId: {
		type: String,
		trim: true,
	},
	createDate: { type: Date, default: Date.now },
	books: [String],
});

module.exports = mongoose.model('Order', OrderSchema);
