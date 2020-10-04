import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders: [],
};

const setOrders = (state, action) => {
	return {
		...state,
		orders: action.orders,
	};
};

const setNewOrder = (state, action) => {
	const ordersCopy = [...state.orders];
	ordersCopy.push(action.order);
	return {
		...state,
		orders: ordersCopy,
	};
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_NEW_ORDER:
			return setNewOrder(state, action);
		case actionTypes.SET_ORDERS:
			return setOrders(state, action);
		default:
			return state;
	}
};

export default userReducer;
