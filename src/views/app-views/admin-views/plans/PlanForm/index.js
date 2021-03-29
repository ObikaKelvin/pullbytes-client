import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import { getPlan, createPlan, updatePlan } from "redux/actions/plan"
import PlanService from "services/PlanService"


const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

const PlanForm = props => {
	let history = useHistory();

	const { mode = ADD, param, getPlan, createPlan, updatePlan } = props

	const [form] = Form.useForm();
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)

	useEffect(() => {
    	if(mode === EDIT) {
			const { id } = param
			const planId = parseInt(id)
			PlanService.getPlan(planId).then(response => {
				const { plan } = response;
				getPlan(response.plan)
				form.setFieldsValue({
					name: plan.name,
					price: plan.price,
					type: plan.type,
					interval: plan.interval,
					active_url_number: plan.active_url_number,
					description: plan.features,
					features: plan.features,
				});
			});
			
		}
  	}, [form, mode, param]);

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

	const onFinish = () => {
		setSubmitLoading(true)
		form.validateFields().then(values => {
			setTimeout(() => {
				setSubmitLoading(false)
				if(mode === ADD) {
					PlanService.createPlan(values).then(response => {
						message.success(`Created ${response.name} to plan list`);
						setSubmitLoading(false);
						setTimeout(() => {
							history.push('/app/admin/plans');
						}, 1000)
					});
				}
				if(mode === EDIT) {
					const { id } = param;
					PlanService.updatePlan(id, values).then(response => {
						message.success(`Plan has been updated`);
						setSubmitLoading(false);
					});
				}
			}, 1500);
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
							<h2 className="mb-3">{mode === 'ADD'? 'Add New Plan' : `Edit Plan`} </h2>
							<div className="mb-3">
								<Button className="mr-2">Discard</Button>
								<Button type="primary" onClick={() => onFinish()} htmlType="submit" loading={submitLoading} >
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

const mapStateToProps = ({ planReducer }) => {
	const { plan } = planReducer;
	return {
		plan
	}
}

const mapDispatchToProps = {
	getPlan, createPlan, updatePlan
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanForm);
