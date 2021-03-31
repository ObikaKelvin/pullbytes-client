import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select, Tag } from 'antd';

const { Option } = Select;

const GeneralField = () => {
	const status = ['active', 'inactive'];
	const renew = ['yes', 'no'];
	return(
		<Row gutter={16}>
			<Col xs={24} sm={24} md={16}>
				<Card title="Basic Info">
					<Form.Item name="license_number" label="License Number" >
						<Input type="text" readOnly bordered={false} />
					</Form.Item>
					<Form.Item name="plan" label="Plan" >
						<Input type="text" readOnly bordered={false} />
					</Form.Item>
					<Form.Item name="billing_cycle" label="Next Billing Cycle" >
						<Input type="text" readOnly bordered={false} />
					</Form.Item>
					<Form.Item name="expires_at" label="Expires at" >
						<Input type="text" readOnly bordered={false} />
					</Form.Item>
					<Form.Item name="status" label="Status" >
						<Input type="text" readOnly bordered={false} />
					</Form.Item>
				</Card>
			</Col>			
			
			<Col xs={24} sm={24} md={8}>
				<Card>
					<Form.Item name="auto_renew" label="Auto Renew" >
						<Input type="text" readOnly bordered={false} />
					</Form.Item>
					<Form.Item name="active_urls" label="Active urls">
						<Select mode="tags" style={{ width: '100%' }} placeholder="Active urls">
						</Select>
					</Form.Item>
				</Card>
			</Col>
		</Row>
	)
}

export default GeneralField
