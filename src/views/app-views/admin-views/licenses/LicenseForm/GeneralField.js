import React from 'react'
import { Row, Col, Card, Form, Select } from 'antd';

const { Option } = Select;

const rules = {
	plan: [
		{
			required: true,
			message: 'Please select a plan',
		}
	],
	email: [
		{
			required: true,
			message: 'Please enter email address',
		}
	],
	active_urls: [
		{
			required: true,
			message: 'Please enter at least website url',
		}
	]
}

const GeneralField = props => {
	const status = ['active', 'inactive', 'expired'];
	return(
		<Row gutter={16}>
			<Col xs={24} sm={24} md={16}>
				<Card title="Basic Info">
					<Form.Item name="plan" label="Plan" >
						<Select className="w-100" placeholder="Plan">
							{props.plans && props.plans.map(elm => <Option key={elm.id}>{elm.name}</Option>)}
						</Select>
					</Form.Item>
					<Form.Item name="users" label="Users" rules={rules.active_urls}>
						<Select style={{ width: '100%' }} placeholder="Users">
							{props.users && props.users.map(elm => <Option key={elm.id}>{elm.name}</Option>)}
						</Select>
					</Form.Item>
					<Form.Item name="status" label="Status" >
						<Select className="w-100" placeholder="Status">
							{status.map(elm => <Option key={elm}>{elm}</Option>)}
						</Select>
					</Form.Item>
					<Form.Item name="active_urls" label="Active urls" rules={rules.active_urls}>
						<Select mode="tags" style={{ width: '100%' }} placeholder="Active urls">
						</Select>
					</Form.Item>
				</Card>
			</Col>			
		</Row>
	)
}

export default GeneralField
