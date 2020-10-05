import React from 'react';
import { Collapse } from 'antd';
import moment from 'moment';
import { PropTypes } from 'prop-types';

import classes from './OrdersSection.module.scss';

const ordersSection = props => {
	const { orders } = props;
	const { Panel } = Collapse;
	return (
		<div className={classes.ordersSection}>
			<h2>Orders</h2>
			<Collapse accordion>
				{orders.map(order => {
					const { _id, createDate, books } = order;
					return (
						<Panel
							key={_id}
							header={`Order: ${_id}, Placed in ${
								createDate ? moment(createDate).format('DD/MM/YYYY HH:mm') : ''
							}`}
						>
							{books.map((book, index) => {
								const { title, publisher, author } = book;
								return (
									<div className={classes.book}>
										<p>
											<span>{index + 1}</span>
											<span>.</span>
										</p>
										<p>{title}</p>
										<span> | </span>
										<p>{author}</p>
										<span> | </span>
										<p>{publisher}</p>
									</div>
								);
							})}
						</Panel>
					);
				})}
			</Collapse>
		</div>
	);
};

ordersSection.defaultProps = {
	orders: [],
};

ordersSection.propTypes = {
	orders: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			createDate: PropTypes.string,
			books: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					title: PropTypes.string,
					publisher: PropTypes.string,
					author: PropTypes.string,
					image: PropTypes.string,
				}),
			),
		}),
	),
};

export default ordersSection;
