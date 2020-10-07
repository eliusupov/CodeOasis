const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const Book = require('../models/BookModel');

exports.userCreate = async (req, res, next) => {
	const { email, password, isAdmin } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			try {
				const newUser = new User({ email, password: await bcrypt.hash(password, 12), isAdmin });
				const user = await newUser.save();
				const token = jwt.sign({ userId: user._id, email: user.email, isAdmin: user.isAdmin }, 'secret', {
					expiresIn: '12h',
				});
				res.status(201).json({ userId: user._id, token: token });
			} catch (err) {
				return next(err);
			}
		} else {
			res.status(500).json({ success: false });
		}
	} catch (err) {
		return next(err);
	}
};

exports.userLogin = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign({ userId: user._id, email: user.email, isAdmin: user.isAdmin }, 'secret', {
				expiresIn: '8h',
			});
			res.json({
				userId: user._id,
				token,
			});
		} else {
			const err = new Error();
			err.statusCode = 401;
			return next(err);
		}
	} catch (err) {
		return next(err);
	}
};

exports.userCheckEmailAvail = async (req, res, next) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		res.json(!user);
	} catch (err) {
		return next(err);
	}
};

exports.userAddBookToCart = async (req, res, next) => {
	const { userId } = req;
	const { bookId } = req.body;
	try {
		const user = await User.findOne({ _id: userId });
		if (user) {
			const { cart } = user;
			cart.push(bookId);
			const updatedCart = await Book.find({ _id: { $in: cart } });
			const updatedUser = await User.findOneAndUpdate({ _id: userId }, { cart }, { new: true });
			if (updatedUser) {
				res.json({
					userId,
					cart: updatedCart,
				});
			} else {
				const error = new Error();
				error.statusCode = 500;
				throw error;
			}
		}
	} catch (err) {
		return next(err);
	}
};

exports.userRemoveBookFromCart = async (req, res, next) => {
	const { userId } = req;
	const { bookId } = req.body;
	try {
		const user = await User.findOne({ _id: userId });
		if (user) {
			const { cart } = user;
			const updatedCartIds = cart.filter(book => book !== bookId);
			const updatedCart = await Book.find({ _id: { $in: updatedCartIds } });
			const updatedUser = await User.findOneAndUpdate({ _id: userId }, { cart: updatedCartIds }, { new: true });
			if (updatedUser) {
				res.json({
					userId,
					cart: updatedCart,
				});
			} else {
				const error = new Error();
				error.statusCode = 500;
				throw error;
			}
		}
	} catch (err) {
		return next(err);
	}
};

exports.userGetCart = async (req, res, next) => {
	const { userId } = req;
	try {
		const user = await User.findOne({ _id: userId });
		if (user) {
			const userCart = user.cart;
			const cart = await Book.find({ _id: { $in: userCart } });
			res.json({
				userId,
				cart,
			});
		}
	} catch (err) {
		return next(err);
	}
};
