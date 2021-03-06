import React, {useState, useEffect} from 'react'
import { Card, Table, Input, Menu, Select, Button, Tag, Switch } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined, CloseOutlined, CheckOutlined} from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils';
import { connect } from 'react-redux';
import { getLicenses, deleteLicense } from 'redux/actions/license';
import LicenseService from 'services/LicenseService';
import SubscriptionService from 'services/SubscriptionService';
import Loading from 'components/shared-components/Loading';

const { Option } = Select

const LicenseList = (props) => {	
	
	const { getLicenses, licenses } = props;
	let history = useHistory();
	const [list, setList] = useState([]);
	const [renew, setRenew] = useState('');
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	useEffect(() => {
		LicenseService.getLicenses().then( ({ licenses }) => {
			getLicenses(licenses);
			setList(licenses)
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
	
	const createLicense = () => {
		history.push(`/app/admin/licenses/add`)
	}
	
	const viewDetails = row => {
		history.push(`/app/admin/licenses/edit/${row.id}`)
	}
	
	const deleteRow = row => {
		const objKey = 'id'
		let data = list
		if(selectedRows.length > 1) {
			selectedRows.forEach(elm => {
				data = utils.deleteArrayRow(data, objKey, elm.id)
				LicenseService.deleteLicense(elm.id).then(resp => {
					console.log(resp)
					setList(data)
					setSelectedRows([])
					deleteLicense([]);
				});
			})
		} else {
			data = utils.deleteArrayRow(data, objKey, row.id)
			LicenseService.deleteLicense(row.id).then(resp => {
				setList(data)
				deleteLicense(data)
			});
		}
	}

	const getLicenseStatus = status => {
		if(status === 'active') {
			return 'green'
		}
		if(status === 'inactive') {
			return 'warning'
		}
		if(status === 'expired') {
			return 'red'
		}
		return ''
	}

	const onAutoRenew = id => e => {
		if(e){
			SubscriptionService.renewSubscription(id).then( ({ license }) => {
				setRenew(e)
			});
		}
		else{
			SubscriptionService.cancelSubscription(id).then( ({ license }) => {
				setRenew(e)
			});
		}
	}

	const tableColumns = [
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
			title: 'Interval',
			dataIndex: 'interval',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'interval')
		},
		{
			title: 'User',
			dataIndex: 'user',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'user')
		},
		{
			title: 'Amount',
			dataIndex: 'price',
			render: (_, record) => (
				<span className="font-weight-semibold">
					<NumberFormat
						displayType={'text'} 
						value={(Math.round(record.price * 100) / 100).toFixed(2)} 
						prefix={'$'} 
						thousandSeparator={true} 
					/>
				</span>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'price')
		},
		{
			title: 'Auto Renew',
			dataIndex: 'auto_renew',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'auto_renew'),
			render: (_, record) => {
				return (
					<>
						<Switch
							checkedChildren={<CheckOutlined />}
							unCheckedChildren={<CloseOutlined />}
							checked={record.auto_renew === 'yes' ? true : false}
							onChange={onAutoRenew(record.id)}
							disabled
						/>
					</>
				)
			}
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (_, record) => (
				<><Tag color={getLicenseStatus(record.status)}>{record.status}</Tag></>
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
		const searchArray = e.currentTarget.value? list : licenses
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	
	if(licenses){
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




function mapStateToProps({ licenseReducer }){
	const { licenses } = licenseReducer;
	return { licenses };
}

const mapDispatchToProps = { getLicenses }

export default connect(mapStateToProps, mapDispatchToProps
)(LicenseList);
