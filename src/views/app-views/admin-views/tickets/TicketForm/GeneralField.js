import React from 'react'
import { Input, Row, Col, Card, Form } from 'antd';

const rules = {
	title: [
		{
			required: true,
			message: 'Please enter title',
		}
	],
	message: [
		{
			required: true,
			message: 'Please enter message',
		}
	]
}

const GeneralField = props => {
	const status = ['active', 'inactive', 'expired'];
	return(
		<Row gutter={16}>
			<Col xs={24} sm={24} md={16}>
				<Card title="Basic Info">
					
					<Form.Item name="title" label="Title" rules={rules.title}>
						<Input type="text" readOnly bordered={false} />
					</Form.Item>
					<Form.Item name="message" label="Message" rules={rules.message}>
						<Input.TextArea rows={4} readOnly bordered={false} />
					</Form.Item>
					<Form.Item name="reply" label="Reply" rules={rules.reply}>
						<Input.TextArea rows={4} />
					</Form.Item>
					
				</Card>
			</Col>			
		</Row>
	)
}

export default GeneralField
