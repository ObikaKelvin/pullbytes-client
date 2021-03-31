import React, { createRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Input, Row, Col, message } from 'antd';
import UserService from 'services/UserService';

const ChangePassword = props =>{


	const changePasswordFormRef = createRef();
	const [form] = Form.useForm();
	const history = useHistory();

	const onFinish = () => {
		form.validateFields().then(values => {
			UserService.updatePassword(values).then(( response ) => {
				message.success({ content: 'Password Changed!', duration: 2 });
				onReset()
				setTimeout(() => {
					history.push('/auth/login')
				}, 2000);
			})
		});
  };

	const onReset = () => {
    changePasswordFormRef.current.resetFields();
  };

	return (
		<>
			<h2 className="mb-4">Change Password</h2>
			<Row >
				<Col xs={24} sm={24} md={24} lg={8}>
					<Form
						name="changePasswordForm"
						layout="vertical"
						form={form}
						ref={changePasswordFormRef}
						onFinish={onFinish}
					>
						<Form.Item
							label="Current Password"
							name="current_password"
							rules={[{ 
								required: true,
								message: 'Please enter your currrent password!' 
							}]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							label="New Password"
							name="password"
							rules={[{ 
								required: true,
								message: 'Please enter your new password!' 
							}]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							label="Confirm Password"
							name="confirmPassword"
							rules={
								[
									{ 
										required: true,
										message: 'Please confirm your password!' 
									},
									({ getFieldValue }) => ({
										validator(rule, value) {
											if (!value || getFieldValue('password') === value) {
												return Promise.resolve();
											}
											return Promise.reject('Password not matched!');
										},
									}),
								]
							}
						>
							<Input.Password />
						</Form.Item>
						<Button type="primary" htmlType="submit">
								Change password
							</Button>
					</Form>
				</Col>
			</Row>
		</>
	)
}

export default ChangePassword
