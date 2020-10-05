import React from 'react';
import { PropTypes } from 'prop-types';
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

cartListItem.defaultProps = {
	onClickCartItem: () => {},
	hideOnClick: () => {},
};

cartListItem.propTypes = {
	onClickCartItem: PropTypes.func,
	hideOnClick: PropTypes.func,
	book: PropTypes.shape({
		_id: PropTypes.string,
		title: PropTypes.string,
		publisher: PropTypes.string,
		author: PropTypes.string,
		image: PropTypes.string,
	}).isRequired,
};

export default cartListItem;
