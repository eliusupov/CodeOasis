import axios from 'axios';
import * as actions from './actions';
import * as actionTypes from './actionTypes';

const setNewOrder = order => ({ type: actionTypes.SET_NEW_ORDER, order });
const setOrders = orders => ({ type: actionTypes.SET_ORDERS, orders });

export const orderGetAll = () => async dispatch => {
	try {
		const response = await axios.get('http://localhost:3000/order');
		const { data } = response;
		const { orders } = data;
		dispatch(setOrders(orders));
	} catch (err) {
		return false;
	}
};

export const orderCreate = books => async dispatch => {
	try {
		const response = await axios.put('http://localhost:3000/order/create', { books });
		const { data } = response;
		const { order, cart } = data;
		dispatch(setNewOrder(order));
		dispatch(actions.setUserCart(cart));
	} catch (err) {
		return false;
	}
};
