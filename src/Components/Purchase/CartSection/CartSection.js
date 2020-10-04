import React from 'react';
import { Button } from 'antd';

import CartListItem from './CartIListtem/CartIListtem';

import classes from './CartSection.module.scss';

const cartSection = props => {
	const { cart, onClickCartItem, onClickPlaceOrder } = props;
	return (
		<ul className={classes.cartSection}>
			<h2>Cart</h2>
			{cart.map(book => (
				<CartListItem book={book} onClickCartItem={id => onClickCartItem(id)} />
			))}
			<li className={classes.orderButton}>
				<Button type="primary" disabled={!cart.length} onClick={() => cart.length && onClickPlaceOrder(cart)}>
					<span>Place Order</span>
				</Button>
			</li>
		</ul>
	);
};

export default cartSection;
