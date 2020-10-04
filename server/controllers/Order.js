const Order = require('../models/OrderModel');
const Book = require('../models/BookModel');
const User = require('../models/UserModel');

exports.orderGetAll = async (req, res, next) => {
	const { userId } = req;
	try {
		const foundOrders = await Order.find({ userId });
		const orders = await Promise.all(
			foundOrders.map(async order => ({
				_id: order._id,
				userId: order.userId,
				createDate: order.createDate,
				books: await Book.find({ _id: { $in: order.books } }),
			})),
		);
		res.send({ orders, success: true });
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		return next(err);
	}
};

exports.orderAddNew = async (req, res, next) => {
	const { userId } = req;
	const { books } = req.body;
	try {
		const newOrder = new Order({ userId, books });
		const savedOrder = await newOrder.save();
		const orderBooks = await Book.find({ _id: { $in: savedOrder.books } });
		const user = await User.findOneAndUpdate({ _id: userId }, { cart: [] }, { new: true });
		const order = {
			userId,
			books: orderBooks,
			createDate: savedOrder.createDate,
		};
		res.status(201).send({
			order,
			success: true,
			cart: user.cart,
		});
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		return next(err);
	}
};
