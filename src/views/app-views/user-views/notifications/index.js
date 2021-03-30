import React, {useState, useEffect} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Spin, Tag } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils';
import { connect } from 'react-redux';
import { getNotifications, deleteNotification } from 'redux/actions/notification';
import NotificationService from 'services/NotificationService';
import Loading from 'components/shared-components/Loading';

const { Option } = Select

const NotificationList = (props) => {	
	
	const { getNotifications, notifications } = props;
	console.log(props)
	let history = useHistory();
	const [list, setList] = useState([]);
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	useEffect(() => {
		NotificationService.getNotifications().then( ({ notifications }) => {
			getNotifications(notifications);
			setList(notifications)
		});
	}, []);

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View Details</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);
	
	const createNotification = () => {
		history.push(`/app/user/notifications/add`)
	}
	
	const viewDetails = row => {
		history.push(`/app/user/notifications/edit/${row.id}`)
	}
	
	const deleteRow = row => {
		const objKey = 'id'
		let data = list
		if(selectedRows.length > 1) {
			selectedRows.forEach(elm => {
				data = utils.deleteArrayRow(data, objKey, elm.id)
				NotificationService.deleteNotification(elm.id).then(resp => {
					console.log(resp)
					setList(data)
					setSelectedRows([])
					deleteNotification([]);
				});
			})
		} else {
			data = utils.deleteArrayRow(data, objKey, row.id)
			NotificationService.deleteNotification(row.id).then(resp => {
				setList(data)
				deleteNotification(data)
			});
		}
	}

	const getNotificationStatus = status => {
		if(status === 'read') {
			return 'green'
		}
		else {
			return 'red'
		}
		return ''
	}

	const displayNotificationMessage = (type) => {
		switch (type){
			case 'license creaton':
		}
	}

	let i = 1;

	const tableColumns = [
		{
			title: 'S/N',
			render: (_, record) => {
				return (<>{i++}</>)
			}
		},
		{
			title: 'Type',
			dataIndex: 'type',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'type')
		},
		{
			title: 'Message',
			dataIndex: 'message',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'message'),
			render: (_, record) => {
				
			}
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (_, record) => (
				<><Tag color={getNotificationStatus(record.read)}>{record.read === 1 ? 'read':'unread'}</Tag></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)}/>
				</div>
			)
		}
	];

	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : notifications
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}
	
	if(notifications){
		return (
			<Card>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<div className="mr-md-3 mb-3">
							<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
						</div>
						{/* <div className="mb-3">
							<Select 
								defaultValue="All" 
								className="w-100" 
								style={{ minWidth: 180 }} 
								onChange={handleShowCategory} 
								placeholder="Category"
							>
								<Option value="All">All</Option>
								{
									categories.map(elm => (
										<Option key={elm} value={elm}>{elm}</Option>
									))
								}
							</Select>
						</div> */}
					</Flex>
					<div>
						<Button onClick={createNotification} type="primary" icon={<PlusCircleOutlined />} block>Create Notification</Button>
					</div>
				</Flex>
				<div className="table-responsive">
					<Table 
						columns={tableColumns} 
						dataSource={list} 
						rowKey='id' 
						rowSelection={{
							selectedRowKeys: selectedRowKeys,
							type: 'checkbox',
							preserveSelectedRowKeys: false,
							...rowSelection,
						}}
					/>
				</div>
			</Card>
		)
	}
	return <Loading cover="content"/>
	
}




function mapStateToProps({ notificationReducer }){
	const { notifications } = notificationReducer;
	return { notifications };
}

const mapDispatchToProps = { getNotifications }

export default connect(mapStateToProps, mapDispatchToProps
)(NotificationList);
