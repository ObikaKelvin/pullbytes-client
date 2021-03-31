import React from 'react'
import { Row, Col, Card, Form, Select, Input } from 'antd';

const { Option } = Select;

const rules = {
	plan: [
		{
			required: true,
			message: 'Please select plan',
		}
	],
	user: [
		{
			required: true,
			message: 'Please select user',
		}
	],
	status: [
		{
			required: true,
			message: 'Please select status',
		}
	],
	active_urls: [
		{
			required: true,
			message: 'Please enter at least website url',
		}
	],
	auto_renew: [
		{
			required: true,
			message: 'Please select aut renewal',
		}
	]
}

const GeneralField = props => {
	const status = ['active', 'inactive'];
	const auto_renew = ['yes', 'no'];
	if(props.mode === 'EDIT'){
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
							<Select>
								{status.map(elm => <Option>{elm}</Option>)}
							</Select>
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
	return(
		<Row gutter={16}>
			<Col xs={24} sm={24} md={16}>
				<Card title="Basic Info">
					<Form.Item name="plan" label="Plan" >
						<Select className="w-100" placeholder="Plan" rules={rules.plan}>
							{props.plans && props.plans.map(elm => <Option key={elm.id} value={elm.id}>{`${elm.name} - ${elm.interval}`}</Option>)}
						</Select>
					</Form.Item>
					<Form.Item name="users" label="Users" rules={rules.user}>
						<Select style={{ width: '100%' }} placeholder="Users">
							{props.users && props.users.map(elm => <Option key={elm.id} value={elm.id}>{elm.name}</Option>)}
						</Select>
					</Form.Item>
					<Form.Item name="status" label="Status" >
						<Select className="w-100" placeholder="Status">
							{status.map(elm => <Option key={elm} value={elm}>{elm}</Option>)}
						</Select>
					</Form.Item>
				</Card>
			</Col>		

			<Col xs={24} sm={24} md={8}>
					<Card>
						<Form.Item name="trial_days" label="Validity Period(Days)" >
							<Input type="text" />
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
