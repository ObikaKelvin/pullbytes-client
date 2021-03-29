import React, {useState, useEffect} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu } from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils';
import { env } from 'configs/EnvironmentConfig'
import { connect } from 'react-redux';
import { set } from 'lodash';
import { getPlans, deletePlan } from 'redux/actions/plan';
import PlanService from 'services/PlanService';
import isAdmin from 'components/hoc/isAdmin';
import Loading from 'components/shared-components/Loading';

const { Option } = Select

const PlanList = (props) => {	
	
	const { getPlans, plans, deletePlan } = props;

	let history = useHistory();
	const [list, setList] = useState([]);
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	useEffect(() => {
		PlanService.getPlans().then(response => {
			getPlans(response.plans);
			setList(response.plans)
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
	
	const addPlan = () => {
		history.push(`/app/admin/plans/add`)
	}
	
	const viewDetails = row => {
		history.push(`/app/admin/plans/edit/${row.id}`)
	}
	
	const deleteRow = row => {
		const objKey = 'id'
		let data = list
		if(selectedRows.length > 1) {
			selectedRows.forEach(elm => {
				data = utils.deleteArrayRow(data, objKey, elm.id)
				PlanService.deletePlan(elm.id).then(({ plan }) => {
					setList(data)
					setSelectedRows([])
					deletePlan(plan);
				});
			})
		} else {
			data = utils.deleteArrayRow(data, objKey, row.id)
			PlanService.deletePlan(row.id).then(({ plan }) => {
				setList(data)
				deletePlan(plan);
			});
		}
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Name',
			dataIndex: 'name',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Type',
			dataIndex: 'type',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'type')
		},
		{
			title: 'Interval',
			dataIndex: 'interval',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'interval')
		},
		{
			title: 'Price',
			dataIndex: 'price',
			render: price => (
				<div>
					<NumberFormat
						displayType={'text'} 
						value={(Math.round(price * 100) / 100).toFixed(2)} 
						prefix={'$'} 
						thousandSeparator={true} 
					/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'price')
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
		const searchArray = e.currentTarget.value? list : plans
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	const handleShowCategory = value => {
		if(value !== 'All') {
			const key = 'category'
			const data = utils.filterArray(plans, key, value)
			setList(data)
		} else {
			setList(plans)
		}
	}
	
	if(plans){
		return (
			<Card>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<div className="mr-md-3 mb-3">
							<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
						</div>
					</Flex>
					<div>
						<Button onClick={addPlan} type="primary" icon={<PlusCircleOutlined />} block>Add plan</Button>
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




function mapStateToProps({ planReducer }){
	const { plans } = planReducer;
	return { plans };
}

const mapDispatchToProps = { getPlans, deletePlan }

export default connect(mapStateToProps, mapDispatchToProps
)(PlanList);
// )(isAdmin(PlanList));
