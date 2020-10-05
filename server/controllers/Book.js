const Book = require('../models/BookModel');
const User = require('../models/UserModel');

exports.bookGetAll = async (req, res, next) => {
	const { userId } = req;
	try {
		const user = await User.findOne({ _id: userId });
		const userCart = user ? user.cart : [];
		const books = await Book.find({ _id: { $nin: userCart } });
		res.send({ books });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		return next(err);
	}
};

exports.bookAddNew = async (req, res, next) => {
	const { title, author, publisher, image } = req.body;
	try {
		const newBook = new Book({ title, author, publisher, image });
		const book = await newBook.save();
		res.status(201).send({ book });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		return next(err);
	}
};

exports.bookUpdate = async (req, res, next) => {
	const { id, title, author, publisher, image } = req.body;
	try {
		const book = await Book.findOneAndUpdate({ _id: id }, { title, author, publisher, image }, { new: true });
		res.status(200).send({ book });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		return next(err);
	}
};

exports.bookDeleteSingle = async (req, res, next) => {
	const { id } = req.params;
	try {
		const book = await Book.findOneAndDelete({ _id: id });
		if (book) {
			res.send({ id: book._id });
		}
	} catch (err) {
		return next(err);
	}
};
