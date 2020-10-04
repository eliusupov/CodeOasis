const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	author: {
		type: String,
		required: true,
		trim: true,
	},
	publisher: {
		type: String,
		required: true,
		trim: true,
	},
	image: {
		type: String,
		trim: true,
	},
	createDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', BookSchema);
