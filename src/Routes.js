import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from './store/actions/actions';

import Purchase from './Containers/Purchase/Purchase';
import SystemEntry from './Containers/Login/SystemEntry';
import BookStore from './Containers/BookStore/BookStore';

const routes = props => {
	const { history } = props;
	const dispatch = useDispatch();
	const { setTokenFromLocalstorage } = actions;
	const token = useSelector(state => state.userReducer.token);

	useEffect(() => {
		if (!token && localStorage.token) {
			dispatch(setTokenFromLocalstorage(localStorage.token, history));
		}
	}, [token]);

	return (
		<>
			<Route exact path="/" component={SystemEntry} />
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

routes.propTypes = {
	history: PropTypes.shape({
		push: PropTypes.func,
	}).isRequired,
};

export default withRouter(routes);
