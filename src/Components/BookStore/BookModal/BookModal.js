import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/actions';

import classes from './BookModal.module.scss';

const bookModal = props => {
	const { isBookModalOpen, bookToUpdate } = props;
	const { _id, author, publisher, title, image } = bookToUpdate;
	const { toggleBookModal, addNewBook, updateBook } = actions;
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	useEffect(() => {
		if (isBookModalOpen) form.resetFields();
	}, [isBookModalOpen]);

	return (
		<Modal
			visible={isBookModalOpen}
			onCancel={() => {
				dispatch(toggleBookModal());
			}}
			footer={null}
		>
			<Form
				layout="vertical"
				name="book-modal"
				form={form}
				onFinish={values => {
					if (Object.keys(bookToUpdate).length) {
						dispatch(
							updateBook({
								...values,
								id: _id,
							}),
						);
					} else {
						dispatch(addNewBook(values));
					}
				}}
				className={classes.bookModalForm}
			>
				<h2>Add new book</h2>
				<Form.Item
					label="Book Title"
					name="title"
					initialValue={title}
					rules={[{ required: true, message: 'Title is required' }]}
				>
					<Input placeholder="Title" />
				</Form.Item>
				<Form.Item
					label="Author"
					name="author"
					initialValue={author}
					rules={[{ required: true, message: 'Author is required' }]}
				>
					<Input placeholder="Author" />
				</Form.Item>
				<Form.Item
					label="Publisher"
					name="publisher"
					initialValue={publisher}
					rules={[{ required: true, message: 'Publisher is required' }]}
				>
					<Input placeholder="Publisher" />
				</Form.Item>
				<Form.Item label="Image" name="image" initialValue={image}>
					<Input placeholder="Image" />
				</Form.Item>
				<Button key="submit" type="primary" htmlType="submit">
					<span>Submit</span>
				</Button>
			</Form>
		</Modal>
	);
};

export default bookModal;
