import React from 'react';
import { Button } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

import classes from './BookCard.module.scss';

const bookCard = props => {
	const { book, toggleBookModal, deleteBook, isAdmin, addToCart } = props;
	const { _id, title, publisher, author, image } = book;
	return (
		<div className={classes.bookCard}>
			<img
				src={
					image ||
					'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6'
				}
			/>
			<div className={classes.content}>
				<h3>{title}</h3>
				<h4>{author}</h4>
				<h4>{publisher}</h4>
			</div>
			{isAdmin && (
				<>
					<CloseOutlined onClick={() => deleteBook(_id)} />
					<EditOutlined onClick={() => toggleBookModal(_id)} />
				</>
			)}
			{!isAdmin && (
				<Button type="primary" onClick={() => addToCart(_id)}>
					<span>Add To Cart</span>
				</Button>
			)}
		</div>
	);
};

export default bookCard;
