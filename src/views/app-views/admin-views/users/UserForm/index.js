import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import GeneralField from './GeneralField'
import UserService from "services/UserService"
import { getUser, updateUser, createUser } from 'redux/actions/user';



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

	const { mode = ADD, param, getUser, updateUser, createUser } = props;

	const [form] = Form.useForm();
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)

	console.log(mode)
	useEffect(() => {
		if(mode === EDIT) {
			console.log('is edit')
			console.log('props', props)
			const { id } = param;

			const userId = parseInt(id)
			UserService.getUser(userId).then(({ user }) => {
				getUser(user);
				form.setFieldsValue({
					name: user.name,
					email: user.email,
					role: user.role,
					password: undefined
				});
				// setImage(user.image)
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
				UserService.createUser(values).then(({ user }) => {
					createUser(user)
					message.success(`Added ${user.name} to user list`);
					setSubmitLoading(false);
					setTimeout(() => {
						history.push('/app/admin/users');
					}, 1000)
				});
			}
			if(mode === EDIT) {
				const { id } = param;
				UserService.updateUser(id, values).then(({ user }) => {
					updateUser(user)
					message.success(`User has been updated`);
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
				encType="multipart/form-data"
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
							<h2 className="mb-3">{mode === 'ADD'? 'Add New User' : `Edit User`} </h2>
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

function mapStateToProps({ userReducer }){
	const { users } = userReducer;
	return { users };
}

const mapDispatchToProps = { getUser, updateUser, createUser }

export default connect(mapStateToProps, mapDispatchToProps
)(UserForm);
