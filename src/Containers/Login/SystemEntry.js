import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import * as actions from '../../store/actions/actions';

import classes from './SystemEntry.module.scss';

const systemEntry = props => {
	const [userAlreadyExist, setUserAlreadyExist] = useState(false);
	const [incorrectLogin, setIncorrectLogin] = useState(false);
	const { location, history } = props;
	const { pathname } = location;
	const dispatch = useDispatch();

	const onSubmitRegister = async values => {
		setUserAlreadyExist(false);
		const canCreate = await dispatch(actions.checkEmail(values.email));
		setUserAlreadyExist(!canCreate);
		if (canCreate) {
			await dispatch(actions.userCreate(values, history));
		}
	};

	const onSubmitLogin = async values => {
		if (incorrectLogin) setIncorrectLogin(false);
		const login = await dispatch(actions.userLogin(values, history));
		if (login === false) setIncorrectLogin(!login);
	};

	let submitFuntion = onSubmitRegister;
	if (pathname === '/login') {
		submitFuntion = onSubmitLogin;
	}

	return (
		<div className={classes.login}>
			<Form
				name="normal_login"
				className={classes.loginForm}
				initialValues={{ remember: true }}
				onFinish={submitFuntion}
			>
				{pathname === '/login' && <h3>Login to Book Store</h3>}
				{pathname === '/register' && <h3>Register to Book Store</h3>}
				<Form.Item
					name="email"
					rules={[
						{ required: true, message: 'Please input your Email!' },
						{ type: 'email', message: 'must be a valid email' },
					]}
				>
					<Input prefix={<UserOutlined />} placeholder="Email" />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{ required: true, message: 'Please input your Password!' },
						{ min: 5, max: 12, message: 'Must be minimum of 5 and maximum 12 chars' },
					]}
				>
					<Input prefix={<LockOutlined />} type="password" placeholder="Password" />
				</Form.Item>
				{pathname === '/register' && (
					<Form.Item name="isAdmin" valuePropName="checked">
						<Checkbox>Create as Admin?</Checkbox>
					</Form.Item>
				)}
				{pathname === '/register' && userAlreadyExist && (
					<div className={classes.err}>Email already exists in the system</div>
				)}
				{pathname === '/login' && incorrectLogin && (
					<div className={classes.err}>Email or password are incorrect</div>
				)}
				<Form.Item>
					{pathname === '/login' && (
						<Button type="primary" htmlType="submit">
							<span>Log in</span>
						</Button>
					)}
					{pathname === '/register' && (
						<Button type="primary" htmlType="submit">
							<span>Register</span>
						</Button>
					)}
				</Form.Item>
				{pathname === '/register' && (
					<Link to="/login">
						<span>Login now!</span>
					</Link>
				)}
				{pathname === '/login' && (
					<Link to="/register">
						<span>Register now!</span>
					</Link>
				)}
			</Form>
		</div>
	);
};

export default systemEntry;
