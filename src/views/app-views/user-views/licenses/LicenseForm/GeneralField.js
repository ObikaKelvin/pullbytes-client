import React, {useEffect, useState} from 'react'
import { Input, Row, Col, Card, Form, Upload, InputNumber, message, Select } from 'antd';
import { ImageSvg } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import { LoadingOutlined } from '@ant-design/icons';
import DataService from '../../../../../services/DataService';

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
	const status = ['active', 'inactive'];
	const renew = ['renew', 'cancel'];
	return(
		<Row gutter={16}>
			<Col xs={24} sm={24} md={16}>
				<Card title="Basic Info">
					<Form.Item name="license_number" label="License Number" >
						<Input type="text" disabled />
					</Form.Item>
					<Form.Item name="plan" label="Plan" >
						<Input type="text" disabled />
					</Form.Item>
					<Form.Item name="status" label="Status" >
						<Select className="w-100" placeholder="Status">
							{status.map(elm => <Option key={elm}>{elm}</Option>)}
						</Select>
					</Form.Item>
					<Form.Item name="renewal" label="Renewal" rules={rules.active_urls}>
						<Select style={{ width: '100%' }} placeholder="Renewal">
							{renew.map(elm => <Option key={elm}>{elm}</Option>)}
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
