import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button, Input, Row, Col, message } from 'antd';
import UserService from 'services/UserService';
import { connect } from 'react-redux';

const EditProfile = props =>{

	const [form] = Form.useForm();
	const { user } = props;

	useEffect(() => {
		form.setFieldsValue({
			username: user.name,
			email: user.email})
	}, [])

	const onFinish = () => {
		form.validateFields().then(values => {
			UserService.updatePassword(values).then(( response ) => {
				message.success({ content: 'Password Changed!', duration: 2 });
			})
		});
  	};

	return (
		<>
			<h2 className="mb-4">Edit Profile</h2>
			<Row >
				<Col xs={24} sm={24} md={24} lg={8}>
					<Form
						name="EditProfileForm"
						layout="vertical"
						form={form}
						onFinish={onFinish}
					>
						<Form.Item
							label="User Name"
							name="username"
							rules={[{ 
								required: true,
								message: 'Please enter username' 
							}]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Email"
							name="email"
							rules={[{ 
								required: true,
								message: 'Please enter email address' 
							}]}
						>
							<Input />
						</Form.Item>

						<Button type="primary" htmlType="submit">
							Update
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	)
}

const mapStateToProps = ({ auth }) => {
	const { user } = auth;
	return { user };
}

export default connect(mapStateToProps)(EditProfile)
