const User = require('../models/UserModel');
const Book = require('../models/BookModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userCreate = async (req, res, next) => {
	const { email, password, isAdmin } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			try {
				const newUser = new User({ email, password: await bcrypt.hash(password, 12), isAdmin });
				const user = await newUser.save();
				const token = jwt.sign({ userId: user._id, email: user.email, isAdmin: user.isAdmin }, 'secret', {
					expiresIn: '8h',
				});
				res.status(201).send({ userId: user._id, token: token, success: true });
			} catch (err) {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				return next(err);
			}
		} else {
			res.status(500).send({ success: false });
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
			res.send({
				success: true,
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
		res.send(!user);
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
				res.send({
					success: true,
					userId,
					cart: updatedCart,
					userCart: updatedUser.cart,
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
				res.send({
					success: true,
					userId,
					cart: updatedCart,
					userCart: updatedUser.cart,
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
			res.send({
				success: true,
				userId,
				cart,
				userCart: user.cart,
			});
		}
	} catch (err) {
		return next(err);
	}
};
