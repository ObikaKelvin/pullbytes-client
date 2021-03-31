import React, {useEffect, useState} from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select } from 'antd';

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
	return(
		<Row gutter={16}>
			<Col xs={24} sm={24} md={16}>
				<Card title="Basic Info">
					
					<Form.Item name="title" label="Title" rules={rules.title}>
						<Input type="text" bordered={props.param ? false : true} readOnly={props.param ? true : false} />
					</Form.Item>
					<Form.Item name="message" label="Message" rules={rules.message}>
						<Input.TextArea rows={4} bordered={props.param ? false : true} readOnly={props.param ? true : false} />
					</Form.Item>
					<Form.Item name="reply" label="reply" >
						<Input.TextArea rows={4} bordered={false} readOnly />
					</Form.Item>
					
				</Card>
			</Col>			
		</Row>
	)
}

export default GeneralField
