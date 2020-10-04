import axios from 'axios';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
	cart: [],
	token: '',
	email: '',
	userId: '',
	tokenExpire: '',
};

const setUserData = (state, action) => {
	const { token } = action;
	const decodedToken = jwtDecode(token);
	if (!localStorage.token) localStorage.token = token;
	return {
		...state,
		token,
		isAdmin: decodedToken.isAdmin || false,
		email: decodedToken.email || '',
		userId: decodedToken.userId || '',
		tokenExpire: decodedToken.exp
			? moment.unix(decodedToken.exp).format('DD/MM/YYYY HH:mm')
			: moment().format('DD/MM/YYYY HH:mm'),
	};
};

const setUserLogout = state => {
	return {
		...state,
		userId: '',
		token: '',
		email: '',
		tokenExpire: '',
		isAdmin: false,
	};
};

const setUserCart = (state, action) => {
	const cart = action.cart || state.cart;
	return {
		...state,
		cart,
	};
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_USER_DATA:
			return setUserData(state, action);
		case actionTypes.SET_USER_LOGOUT:
			return setUserLogout(state, action);
		case actionTypes.SET_USER_CART:
			return setUserCart(state, action);
		default:
			return state;
	}
};

export default userReducer;
