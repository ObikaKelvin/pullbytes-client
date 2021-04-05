import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Input, Table, Row, Col, Card, Form, Button, InputNumber, message, Select, Tag } from 'antd';
import Flex from 'components/shared-components/Flex'
import { PlusCircleOutlined } from '@ant-design/icons';
import utils from 'utils';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import PromoCodeService from 'services/PromoCodeService';

const { Option } = Select;

const GeneralField = (props) => {
	const { history } = useHistory();
	const status = ['active', 'inactive'];
	const renew = ['yes', 'no'];
	const [list, setList] = useState([]);

	useEffect(() => {
		PromoCodeService.getPromoCodes().then(response => {
			setList(response.promoCodes)
		})
	}, []);

	const tableColumns = [
		{
			dataIndex: 'code',
		}
	];

	const addCoupon = () => {
		history.push(`/app/admin/coupons/add`)
	}

	if(props.mode === 'EDIT'){
		return(
			<>
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

				<Row>
					<Col xs={24} sm={24} md={24}>
						<Card title="Promo Codes">
							{/* <Flex>
								<Button onClick={addCoupon} type="primary" icon={<PlusCircleOutlined />} block>Add coupon</Button>
							</Flex> */}
							<div className="table-responsive">
								<Table 
									columns={tableColumns} 
									dataSource={list}
									rowKey='id'
								/>
							</div>
						</Card>
						
					</Col>
				</Row>
			</>
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
						<Input type="number" />
					</Form.Item>
					<Form.Item name="number_promo_codes" label="number of promo codes" >
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
