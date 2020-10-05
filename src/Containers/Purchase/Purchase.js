import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/actions/actions';
import MainNavBar from '../../Components/MainComponents/MainNavBar/MainNavBar';
import CartSection from '../../Components/Purchase/CartSection/CartSection';
import OrdersSection from '../../Components/Purchase/OrdersSection/OrdersSection';

import classes from './Purchase.module.scss';

const purchase = props => {
	const { history } = props;
	const { userGetCart, userRemoveFromCart, orderGetAll, orderCreate } = actions;
	const dispatch = useDispatch();
	const cart = useSelector(state => state.userReducer.cart);
	const token = useSelector(state => state.userReducer.token);
	const orders = useSelector(state => state.orderReducer.orders);

	useEffect(() => {
		if (token) {
			dispatch(orderGetAll());
			dispatch(userGetCart());
		}
	}, [token]);

	return (
		<div className={classes.cart}>
			<MainNavBar history={history} />
			<div className={classes.inner}>
				<CartSection
					cart={cart}
					onClickPlaceOrder={cart => dispatch(orderCreate(cart))}
					onClickCartItem={id => dispatch(userRemoveFromCart(id))}
				/>
				<div className={classes.spacer} />
				<OrdersSection orders={orders} />
			</div>
		</div>
	);
};

purchase.propTypes = {
	history: PropTypes.shape({
		location: PropTypes.shape({
			pathname: PropTypes.string,
		}),
	}).isRequired,
};

export default purchase;
