const Book = require('../models/BookModel');
const User = require('../models/UserModel');

exports.bookGetAll = async (req, res, next) => {
	const { userId } = req;
	try {
		const user = await User.findOne({ _id: userId });
		const userCart = user ? user.cart : [];
		const books = await Book.find({ _id: { $nin: userCart }, active: true });
		res.send({ books });
	} catch (err) {
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
		return next(err);
	}
};

exports.bookUpdate = async (req, res, next) => {
	const { id, title, author, publisher, image } = req.body;
	try {
		const book = await Book.findOneAndUpdate({ _id: id }, { title, author, publisher, image }, { new: true });
		res.status(200).send({ book });
	} catch (err) {
		return next(err);
	}
};

exports.bookDeleteSingle = async (req, res, next) => {
	const { id } = req.params;
	try {
		const book = await Book.findOneAndUpdate({ _id: id }, { active: false });
		if (book) {
			res.send({ id: book._id });
		}
	} catch (err) {
		return next(err);
	}
};
