import React from 'react'
import { Input, Row, Col, Card, Form, message, Select } from 'antd';

const { Option } = Select;

const rules = {
	name: [
		{
			required: true,
			message: 'Please enter name',
		}
	],
	email: [
		{
			required: true,
			message: 'Please enter email address',
		}
	],
	role: [
		{
			required: true,
			message: 'Please select role',
		}
	],
	password: [
		{
			required: true,
			message: 'Please enter password',
		}
	],
	confirm_password: [
		{
			required: true,
			message: 'Please confirm your password',
		}
	]
}


const imageUploadProps = {
	name: 'profile',
	multiple: true,
	listType: "picture-card",
	showUploadList: false,
	action: 'http://127.0.0.1:8000/api/v1/users_file/'
	// action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
  }
  
  const beforeUpload = file => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
	  message.error('You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
	  message.error('Image must smaller than 2MB!');
	}
	return isJpgOrPng && isLt2M;
  }

const GeneralField = props => {
	return(
	<Row gutter={16}>
		<Col xs={24} sm={24} md={24}>
			<Card title="Basic Info">
				<Form.Item name="name" label="Name" rules={rules.name}>
					<Input placeholder="Name" />
				</Form.Item>
				<Form.Item name="email" label="email" rules={rules.email}>
					<Input placeholder="Email Address" />
				</Form.Item>
				<Form.Item name="role" label="Role" rules={rules.role}>
					<Select className="w-100" placeholder="Role">
						<Option key="customer" value="customer">Customer</Option>
						<Option key="admin" value="admin">Admin</Option>
					</Select>
				</Form.Item>
				<Form.Item name="password" label="Password" rules={rules.password}>
					<Input placeholder="Password" type="password" />
				</Form.Item>
				<Form.Item name="confirm_password" label="Confirm Password" rules={rules.confirm_password}>
					<Input placeholder="Confirm Password" type="password" />
				</Form.Item>
			</Card>
		</Col>

		{/* <Col xs={24} sm={24} md={7}>
			<Card title="Profile Picture">
				<Dragger {...imageUploadProps} beforeUpload={beforeUpload} 
				// data={file => file.fileName = 'keiks'} 
				onChange={e=> props.handleUploadChange(e)}>
					{
						props.uploadedImg ? 
						<img src={props.uploadedImg} alt="avatar" className="img-fluid" /> 
						: 
						<div>
							{
								props.uploadLoading ? 
								<div>
									<LoadingOutlined className="font-size-xxl text-primary"/>
									<div className="mt-3">Uploading</div>
								</div> 
								: 
								<div>
									<CustomIcon className="display-3" svg={ImageSvg}/>
									<p>Click or drag file to upload</p>
								</div>
							}
						</div>
					}
				</Dragger>
			</Card>
			
		</Col> */}
	
		
	</Row>
)}

export default GeneralField
