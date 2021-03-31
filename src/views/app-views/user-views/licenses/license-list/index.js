import React, {useState, useEffect} from 'react'
import { Card, Table, Input, Menu, Tag, Switch } from 'antd';
import { EyeOutlined, SearchOutlined, CloseOutlined, CheckOutlined} from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils';
import { connect } from 'react-redux';
import { getLicenses, getLicense } from 'redux/actions/license';
import LicenseService from 'services/LicenseService';
import SubscriptionService from 'services/SubscriptionService';
import Loading from 'components/shared-components/Loading';


const LicenseList = (props) => {	
	
	const { getLicenses, licenses, getLicense } = props;
	let history = useHistory();
	const [list, setList] = useState([]);
	const [renew, setRenew] = useState('');
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	useEffect(() => {
		LicenseService.getMyLicenses().then( ({ licenses }) => {
			getLicenses(licenses);
			setList(licenses)
		});
	}, [renew]);

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View Details</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);
	
	const viewDetails = row => {
		history.push(`/app/user/licenses/edit/${row.id}`)
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
				console.log(license)
				setRenew(e)
			});
		}
		else{
			SubscriptionService.cancelSubscription(id).then( ({ license }) => {
				console.log(license)
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
						/>
					</>
				)
			}
		},
		// {
		// 	title: 'Billing Cycle',
		// 	dataIndex: 'billing_cycle',
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'billing_cycle'),
		// 	render: (_, record) => (
		// 		record.billing_cycle ? 
		// 		<>{record.billing_cycle}</> : 
		// 		<>--</>
		// 	),
		// },
		// {
		// 	title: 'Expires at',
		// 	dataIndex: 'expires_at',
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'expires_at'),
		// 	render: (_, record) => (
		// 		record.expires_at ? 
		// 		<>{record.expires_at}</> : 
		// 		<>--</>
		// 	),
		// },
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

const mapDispatchToProps = { getLicenses, getLicense }

export default connect(mapStateToProps, mapDispatchToProps
)(LicenseList);
