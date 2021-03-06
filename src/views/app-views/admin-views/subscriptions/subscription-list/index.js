import React, {useState, useEffect} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Spin } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils';
import { connect } from 'react-redux';
import { getSubscriptions } from '../../../../../redux/actions/fetchData';
import DataService from '../../../../../services/DataService';
import Loading from '../../../../../components/shared-components/Loading';

const { Option } = Select

const SubscriptionList = (props) => {	
	const { getSubscriptions, subscriptions } = props;
	let history = useHistory();
	const [list, setList] = useState([]);
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])	

	useEffect(() => {
		DataService.getSubscriptions().then( ({ subscriptions }) => {
			getSubscriptions(subscriptions);
			setList(subscriptions)
		});
	}, []);

	console.log(subscriptions)

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
	
	const createLicense = () => {
		history.push(`/app/admin/subscriptions/add`)
	}
	
	const viewDetails = row => {
		history.push(`/app/admin/subscriptions/edit/${row.id}`)
	}
	
	const deleteRow = row => {
		const objKey = 'id'
		let data = list
		if(selectedRows.length > 1) {
			selectedRows.forEach(elm => {
				data = utils.deleteArrayRow(data, objKey, elm.id)
				DataService.deleteLicense(elm.id).then(resp => {
					setList(data)
					setSelectedRows([])
				});
			})
		} else {
			data = utils.deleteArrayRow(data, objKey, row.id)
			DataService.deleteUser(row.id).then(resp => {
				setList(data)
			});
		}
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'License Number',
			dataIndex: 'license_number',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'license_number')
		},
		{
			title: 'Plan',
			dataIndex: 'plan',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'plan')
		},
		{
			title: 'User',
			dataIndex: 'user',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'user')
		},
		{
			title: 'Active websites',
			dataIndex: 'number_of_urls',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'number_of_urls')
		},
		{
			title: 'Expires at',
			dataIndex: 'expires_at',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'expires_at')
		},
		{
			title: 'Status',
			dataIndex: 'status',
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
		const searchArray = e.currentTarget.value? list : subscriptions
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	
	if(subscriptions){
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
						<Button onClick={createLicense} type="primary" icon={<PlusCircleOutlined />} block>Create License</Button>
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




function mapStateToProps({ subscriptionReducer }){
	const { subscriptions } = subscriptionReducer;
	return { subscriptions };
}

const mapDispatchToProps = { getSubscriptions }

export default connect(mapStateToProps, mapDispatchToProps
)(SubscriptionList);
