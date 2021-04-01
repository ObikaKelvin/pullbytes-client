import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select } from 'antd';

const { Option } = Select;

const rules = {
	name: [
		{
			required: true,
			message: 'Please enter plan name',
		}
	],
	interval: [
		{
			required: true,
			message: 'Please select plan interval',
		}
	],
	type: [
		{
			required: true,
			message: 'Please select plan type',
		}
	],
	price: [
		{
			required: true,
			message: 'Please enter plan price',
		}
	],
	description: [
		{
			required: true,
			message: 'Please enter plan description',
		}
	],
	features: [
		{
			required: true,
			message: 'Please enter plan features',
		}
	],
}

const categories = ['Cloths', 'Bags', 'Shoes', 'Watches', 'Devices']
const tags = ['Cotton', 'Nike', 'Sales', 'Sports', 'Outdoor', 'Toys', 'Hobbies' ]

const GeneralField = props => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={17}>
			<Card title="Basic Info">
				<Form.Item name="name" label="Name" rules={rules.name}>
					<Input placeholder="Name" />
				</Form.Item>
				<Form.Item name="price" label="Price" rules={rules.price}>
					<InputNumber
						className="w-100"
						formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						parser={value => value.replace(/\$\s?|(,*)/g, '')}
					/>
				</Form.Item>
				<Form.Item name="type" label="Type" rules={rules.type}>
					<Select className="w-100" placeholder="Type">
						<Option key="recurring" value="recurring">Recurring</Option>
						<Option key="lifetime" value="lifetime">Lifetime</Option>
					</Select>
				</Form.Item>
				<Form.Item name="description" label="Description" rules={rules.description}>
					<Input.TextArea rows={4} />
				</Form.Item>
				<Form.Item name="features" label="Features" rules={rules.features}>
					<Input.TextArea rows={4} />
				</Form.Item>
			</Card>
		</Col>
		<Col xs={24} sm={24} md={7}>
			<Card title="Organization">
				<Form.Item name="active_url_number" label="Active url number" >
					<Input placeholder="Active url number" />
				</Form.Item>
				<Form.Item name="interval" label="Interval" rules={rules.interval}>
					<Select className="w-100" placeholder="Type">
						<Option key="yearly" value="year">Year</Option>
						<Option key="lifetime" value="lifetime">Lifetime</Option>
					</Select>
				</Form.Item>
				
			</Card>
		</Col>
	</Row>
)

export default GeneralField
