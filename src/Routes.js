import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from './store/actions/actions';

import Purchase from './Containers/Purchase/Purchase';
import SystemEntry from './Containers/Login/SystemEntry';
import BookStore from './Containers/BookStore/BookStore';

const routes = () => {
	const dispatch = useDispatch();
	const { setTokenFromLocalstorage } = actions;
	const token = useSelector(state => state.userReducer.token);

	useEffect(() => {
		if (!token && localStorage.token) {
			dispatch(setTokenFromLocalstorage(localStorage.token));
		}
	}, [token]);

	return (
		<>
			<Route exact path="/login" component={SystemEntry} />
			<Route exact path="/register" component={SystemEntry} />
			{token && (
				<>
					<Route exact path="/bookstore" component={BookStore} />
					<Route exact path="/purchase" component={Purchase} />
				</>
			)}
		</>
	);
};

export default routes;
