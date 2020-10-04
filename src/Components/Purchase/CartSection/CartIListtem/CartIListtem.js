import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

import classes from './CartIListtem.module.scss';

const cartListItem = props => {
	const { book, onClickCartItem, hideOnClick } = props;
	const { _id, title, publisher, author, image } = book;
	return (
		<li className={classes.cartListItem} key={_id}>
			<img
				src={
					image ||
					'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6'
				}
			/>
			<span>{title}</span>
			<span>{author}</span>
			<span>{publisher}</span>
			{!hideOnClick && <CloseOutlined onClick={() => onClickCartItem(_id)} />}
		</li>
	);
};

export default cartListItem;
