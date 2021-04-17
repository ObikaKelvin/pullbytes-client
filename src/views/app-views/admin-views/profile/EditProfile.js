import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import { Form, Button, Input, Row, Col, message } from 'antd';

import UserService from 'services/UserService';
import { setAuthUser } from 'redux/actions/Auth';

const EditProfile = props =>{

	const [form] = Form.useForm();
	const { user } = props;

	useEffect(() => {
		form.setFieldsValue({
			name: user.name,
			email: user.email})
	}, [])

	const onFinish = () => {
		form.validateFields().then(values => {
			UserService.updateMe(values).then(( response ) => {
				props.setAuthUser(response.user);
				message.success({ content: 'Your profile was updated successfully!', duration: 2 });
			})
		});
  	};

	if(user){
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
								name="name"
								rules={[{ 
									required: true,
									message: 'Please enter name' 
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

	return <></>
}

const mapStateToProps = ({ auth }) => {
	const { user } = auth;
	return { user };
}

export default connect(mapStateToProps, {
	setAuthUser
})(EditProfile)
