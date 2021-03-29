import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import DataService from "../../../../../services/DataService"


const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

const SubscriptionForm = props => {
	
	let history = useHistory();

	const { mode = ADD, param } = props;

	const [form] = Form.useForm();
	const [plans, setPlans] = useState('')
	const [users, setUsers] = useState('')
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)

	console.log(mode)
	useEffect(() => {
		if(mode === EDIT) {
			console.log('is edit')
			console.log('props', props)
			const { id } = param;

			const licenseId = parseInt(id)
			DataService.getPlans().then(response => {
				setPlans(response.plans);
			});
			DataService.getUsers().then(response => {
				setUsers(response.users);
			});
			DataService.getLicense(licenseId).then(response => {
				let license = response.license;
				form.setFieldsValue({
					license_number: license.license_number,
					plan: license.plan,
					users: license.user,
					status: license.status,
					expires_at: license.expires_at,
					active_urls: JSON.parse(license.active_urls)
				});
			});
			
		}
		else{
			console.log('not edit')
		}
  	}, [form, mode, param, props]);

	const handleUploadChange = info => {
		if (info.file.status === 'uploading') {
			setUploadLoading(true)
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl =>{
				setImage(imageUrl)
				setUploadLoading(true)
			});
		}
	};

	const onFinish = (e) => {
		e.preventDefault();
		setSubmitLoading(true)
		form.validateFields().then(values => {
				
			if(mode === ADD) {
				DataService.createUser(values).then(response => {
					message.success(`Created ${response.user.name} to user list`);
					setSubmitLoading(false);
					setTimeout(() => {
						history.push('/app/users');
					}, 1000)
				});
			}
			if(mode === EDIT) {
				const { id } = param;
				DataService.updateLicense(id, values).then(response => {
					message.success(`License has been updated`);
					setSubmitLoading(false);
				}).catch(err => {
					setSubmitLoading(false);
				});
			}
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	return (
		<> 
			<Form
				layout="vertical"
				form={form}
				name="advanced_search"
				className="ant-advanced-search-form"
				initialValues={{
					heightUnit: 'cm',
					widthUnit: 'cm',
					weightUnit: 'kg'
				}}
			>
				<PageHeaderAlt className="border-bottom" overlap>
					<div className="container">	
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">{mode === 'ADD'? 'Add New License' : `Edit License`} </h2>
							<div className="mb-3">
								<Button className="mr-2">Discard</Button>
								<Button type="primary" onClick={onFinish} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD'? 'Add' : `Save`}
								</Button>
							</div>
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{marginTop: 30}}>
						<TabPane tab="General" key="1">
							<GeneralField
								license_id = {mode === EDIT ? param.id : null}
								plans = {plans}
								users = {users}
								uploadedImg={uploadedImg} 
								uploadLoading={uploadLoading} 
								handleUploadChange={handleUploadChange}
							/>
						</TabPane>
						{/* <TabPane tab="Variation" key="2">
							<VariationField />
						</TabPane>
						<TabPane tab="Shipping" key="3">
							<ShippingField />
						</TabPane> */}
					</Tabs>
				</div>
			</Form>
		</>
	)
}

export default SubscriptionForm
