import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/actions';

import classes from './MainNavBar.module.scss';

const mainNavBar = props => {
	const { history } = props;
	const { location } = history;
	const { pathname } = location;
	const { Search } = Input;
	const dispatch = useDispatch();
	const cart = useSelector(state => state.userReducer.cart);
	const isAdmin = useSelector(state => state.userReducer.isAdmin);
	const { userLogout, toggleBookModal, searchForBook } = actions;
	return (
		<ul className={classes.mainNavBar}>
			<li>
				<Link to="/bookstore">
					<span>Store</span>
				</Link>
			</li>
			{!isAdmin && (
				<>
					<li>
						<Link to="/purchase">
							<span>Cart</span>
							<span>(</span>
							<span>{cart.length}</span>
							<span>)</span>
							<span>/Orders</span>
						</Link>
					</li>
				</>
			)}
			{pathname === '/bookstore' && (
				<li>
					<Search
						placeholder="Search for a book"
						onChange={changeEvent => dispatch(searchForBook(changeEvent.target.value))}
					/>
				</li>
			)}
			{isAdmin && (
				<li>
					<Button type="primary" onClick={() => dispatch(toggleBookModal())}>
						<span>Add Book</span>
					</Button>
				</li>
			)}
			<li>
				<Button type="primary" onClick={() => dispatch(userLogout(history))}>
					<span>Logout</span>
				</Button>
			</li>
		</ul>
	);
};

mainNavBar.propTypes = {
	history: PropTypes.shape({
		location: PropTypes.shape({
			pathname: PropTypes.string,
		}),
	}).isRequired,
};

export default mainNavBar;
