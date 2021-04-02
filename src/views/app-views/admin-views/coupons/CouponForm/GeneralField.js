import React from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select, Tag } from 'antd';

const { Option } = Select;

const GeneralField = (props) => {
	const status = ['active', 'inactive'];
	const renew = ['yes', 'no'];
	if(props.mode === 'EDIT'){
		return(
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24}>
					<Card title="Basic Info">
						<Form.Item name="name" label="Name" >
							<Input type="text" readOnly bordered={false} />
						</Form.Item>
						<Form.Item name="percent_off" label="Percent Off" >
							<Input type="text" readOnly bordered={false} />
						</Form.Item>
						<Form.Item name="duration" label="Duration" >
							<Input type="text" readOnly bordered={false} />
						</Form.Item>
						<Form.Item name="duration_in_months" label="Duration in Months" >
							<Input type="text" readOnly bordered={false} />
						</Form.Item>
						<Form.Item name="max_redemptions" label="Max Redemptions" >
							<Input type="text" readOnly bordered={false} />
						</Form.Item>
						<Form.Item name="times_redeemed" label="Times Redeemed" >
							<Input type="text" readOnly bordered={false} />
						</Form.Item>
					</Card>
				</Col>
			</Row>
		)
	}

	return(
		<Row gutter={16}>
			<Col xs={24} sm={24} md={24}>
				<Card title="Basic Info">
					<Form.Item name="name" label="Name" >
						<Input type="text" />
					</Form.Item>
					<Form.Item name="percent_off" label="Percent Off" >
						<Input type="text" />
					</Form.Item>
					<Form.Item name="duration" label="Duration" >
						<Input type="text" />
					</Form.Item>
					<Form.Item name="duration_in_months" label="Duration in Months" >
						<Input type="text" />
					</Form.Item>
					<Form.Item name="max_redemptions" label="Max Redemptions" >
						<Input type="text" />
					</Form.Item>
				</Card>
			</Col>
		</Row>
	)
}

export default GeneralField
