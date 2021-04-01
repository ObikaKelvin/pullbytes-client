import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, message, Button } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import { getTicket, createTicket, updateTicket } from 'redux/actions/ticket';
import TicketService from "services/TicketService"


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

	const { mode = ADD, param, getTicket, createTicket, updateTicket } = props;

	const [form] = Form.useForm();
	const [plans, setPlans] = useState('')
	const [users, setUsers] = useState('')
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)

	useEffect(() => {
		if(mode === EDIT) {
			const { id } = param;

			const ticketId = parseInt(id)
			
			TicketService.getMyTicket(ticketId).then(({ ticket }) => {
				getTicket(ticket)
				form.setFieldsValue({
					title: ticket.title,
					message: ticket.message,
					reply: ticket.message,
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
				TicketService.createTicket(values).then(({ ticket }) => {
					createTicket(ticket)
					message.success(`Added to ticket list`);
					setSubmitLoading(false);
					setTimeout(() => {
						history.push('/app/user/tickets');
					}, 1000)
				}).catch(error => {
					// message.error(error.message)
					setSubmitLoading(false)
				})
			}
			if(mode === EDIT) {
				const { id } = param;
				TicketService.updateTicket(id, values).then(({ ticket }) => {
					updateTicket(ticket)
					message.success(`Ticket has been updated`);
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
							<h2 className="mb-3">{mode === 'ADD'? 'Add New Ticket' : `Edit Ticket`} </h2>
							{mode === ADD && <div className="mb-3">
								<Button className="mr-2">Discard</Button>
								<Button type="primary" onClick={onFinish} htmlType="submit" loading={submitLoading} >
									{mode === 'ADD'? 'Add' : `Save`}
								</Button>
							</div>}
						</Flex>
					</div>
				</PageHeaderAlt>
				<div className="container">
					<Tabs defaultActiveKey="1" style={{marginTop: 30}}>
						<TabPane tab="General" key="1">
							<GeneralField
								mode = {mode}
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
	getTicket, createTicket, updateTicket
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
