import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import { getLicense, createLicense, updateLicense } from 'redux/actions/license';
import LicenseService from "services/LicenseService"
import PlanService from "services/PlanService"


const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

const UserForm = props => {
	
	let history = useHistory();

	const { mode = ADD, param, getLicense, createLicense, updateLicense } = props;

	const [form] = Form.useForm();
	const [plans, setPlans] = useState('')
	const [users, setUsers] = useState('')
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)

	useEffect(() => {
		PlanService.getPlans().then(response => {
			setPlans(response.plans);
		});
		if(mode === EDIT) {
			console.log('is edit')
			console.log('props', props)
			const { id } = param;

			const licenseId = parseInt(id)
			
			LicenseService.getMyLicense(licenseId).then(({ license }) => {

				getLicense(license)

				form.setFieldsValue({
					license_number: license.license_number,
					plan: license.plan,
					status: license.status,
					expires_at: license.expires_at ? license.expires_at : '--',
					billing_cycle: license.billing_cycle ? license.billing_cycle : '--',
					auto_renew: license.auto_renew,
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
				LicenseService.createLicense(values).then(({ license }) => {
					createLicense(license)
					message.success(`Created ${license.name} to license list`);
					setSubmitLoading(false);
					setTimeout(() => {
						history.push('/app/admin/licenses');
					}, 1000)
				});
			}
			if(mode === EDIT) {
				const { id } = param;
				LicenseService.updateMyLicense(id, values).then(({ license }) => {
					updateLicense(license)
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

const mapStateToProps = ({ userReducer }) => {
	const { user } = userReducer;
	return {
		user
	}
}

const mapDispatchToProps = {
	getLicense, createLicense, updateLicense
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
