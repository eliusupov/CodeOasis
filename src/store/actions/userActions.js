import axios from 'axios';
import * as actions from './actions';
import * as actionTypes from './actionTypes';

const setUserData = token => ({ type: actionTypes.SET_USER_DATA, token });
const setUserLogout = () => ({ type: actionTypes.SET_USER_LOGOUT });
export const setUserCart = cart => ({ type: actionTypes.SET_USER_CART, cart });

export const setTokenFromLocalstorage = token => dispatch => {
	axios.defaults.headers.authorization = `Bearer ${token}`;
	dispatch(setUserData(token));
};

export const checkEmail = email => async () => {
	if (!email) return false;
	let canCreate = false;
	try {
		const response = await axios.post('http://localhost:3000/user/checkEmail', { email });
		const { data } = response;
		canCreate = data;
	} catch (err) {
		console.log(err);
	}
	return canCreate;
};

export const userCreate = ({ email, password, isAdmin }, history) => async dispatch => {
	try {
		const response = await axios.put('http://localhost:3000/user/create', { email, password, isAdmin });
		const { data } = response;
		const { token } = data;
		axios.defaults.headers.authorization = `Bearer ${token}`;
		dispatch(setUserData(token));
		history.push('/bookstore');
	} catch (err) {
		return false;
	}
};

export const userLogin = ({ email, password }, history) => async dispatch => {
	try {
		const response = await axios.post('http://localhost:3000/user/login', { email, password });
		const { data } = response;
		const { token } = data;
		axios.defaults.headers.authorization = `Bearer ${token}`;
		dispatch(setUserData(token));
		history.push('/bookstore');
	} catch (err) {
		if (err && err.response && err.response.status === 401) {
			return false;
		}
	}
};

export const userLogout = history => async dispatch => {
	axios.defaults.headers.authorization = '';
	localStorage.clear();
	dispatch(setUserLogout());
	history.push('/login');
};

export const userGetCart = () => async dispatch => {
	try {
		const response = await axios.get('http://localhost:3000/user/cart');
		const { data } = response;
		const { cart } = data;
		dispatch(setUserCart(cart));
	} catch (err) {
		console.log(err);
	}
};

export const userAddToCart = bookId => async dispatch => {
	try {
		const response = await axios.put('http://localhost:3000/user/cart', { bookId });
		const { data } = response;
		const { cart } = data;
		dispatch(setUserCart(cart));
	} catch (err) {
		console.log(err);
	}
};

export const userRemoveFromCart = bookId => async dispatch => {
	try {
		const response = await axios.put('http://localhost:3000/user/cart/remove', { bookId });
		const { data } = response;
		const { cart } = data;
		dispatch(setUserCart(cart));
	} catch (err) {
		console.log(err);
	}
};
