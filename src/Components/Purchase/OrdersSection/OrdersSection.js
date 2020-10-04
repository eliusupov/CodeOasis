import React from 'react';
import { Collapse } from 'antd';
import moment from 'moment';

import classes from './OrdersSection.module.scss';

const ordersSection = props => {
	const { orders } = props;
	const { Panel } = Collapse;
	return (
		<div className={classes.ordersSection}>
			<h2>Orders</h2>
			<Collapse accordion>
				{orders.map(order => {
					return (
						<Panel
							key={order._id}
							header={`Order: ${order._id}, Placed in ${
								order.createDate ? moment(order.createDate).format('DD/MM/YYYY HH:mm') : ''
							}`}
						>
							{order.books.map((book, index) => {
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

export default ordersSection;
