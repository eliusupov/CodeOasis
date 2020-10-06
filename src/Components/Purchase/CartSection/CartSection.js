import React from 'react';
import { Button } from 'antd';
import { PropTypes } from 'prop-types';

import CartListItem from './CartIListtem/CartIListtem';

import classes from './CartSection.module.scss';

const cartSection = props => {
	const { cart, onClickCartItem, onClickPlaceOrder } = props;
	return (
		<ul className={classes.cartSection}>
			<h2>Cart</h2>
			{cart.map(book => (
				<CartListItem key={book._id} book={book} onClickCartItem={id => onClickCartItem(id)} />
			))}
			<li className={classes.orderButton}>
				<Button type="primary" disabled={!cart.length} onClick={() => cart.length && onClickPlaceOrder(cart)}>
					<span>Place Order</span>
				</Button>
			</li>
		</ul>
	);
};

cartSection.defaultProps = {
	onClickCartItem: () => {},
	onClickPlaceOrder: () => {},
	cart: [],
};

cartSection.propTypes = {
	onClickCartItem: PropTypes.func,
	onClickPlaceOrder: PropTypes.func,
	cart: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			title: PropTypes.string,
			publisher: PropTypes.string,
			author: PropTypes.string,
			image: PropTypes.string,
		}),
	),
};

export default cartSection;
