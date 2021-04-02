import React, {useState, useEffect} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Spin } from 'antd';
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
import { getCoupons, deleteCoupon } from 'redux/actions/coupon';
import CouponService from 'services/CouponService';
import Loading from 'components/shared-components/Loading';
import { notification } from 'antd';
// import { notification } from 'redux/';


const { Option } = Select

const CouponList = (props) => {	
	
	const { getCoupons, coupons, coupon, deleteCoupon } = props;
	let history = useHistory();
	const [list, setList] = useState([]);
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	useEffect(() => {
		CouponService.getCoupons().then( ({ coupons }) => {
			getCoupons(coupons);
			setList(coupons)
		}).catch(error => {
			notification.error({ message: 'Sorry couldn\'t fetch coupons, please refresh the page'});
			console.log(error.message);
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
	
	const addCoupon = () => {
		history.push(`/app/admin/coupons/add`)
	}
	
	const viewDetails = row => {
		history.push(`/app/admin/coupons/edit/${row.id}`)
	}
	
	const deleteRow = row => {
		const objKey = 'id'
		let data = list
		if(selectedRows.length > 1) {
			selectedRows.forEach(elm => {
				data = utils.deleteArrayRow(data, objKey, elm.id)
				CouponService.deleteCoupon(elm.id).then(({ coupon }) => {
					setList(data)
					setSelectedRows([])
					deleteCoupon(coupon)
				});
			})
		} else {
			data = utils.deleteArrayRow(data, objKey, row.id)
			CouponService.deleteCoupon(row.id).then(({ coupon }) => {
				setList(data)
				deleteCoupon(coupon)

			});
		}
	}

	const tableColumns = [
		{
			title: 'Name',
			dataIndex: 'name',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Percent off',
			dataIndex: 'percent_off',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'percent_off'),
			render: (_, elm) => <>{`${_}%`}</>
		},
		{
			title: 'Duration In Months',
			dataIndex: 'duration_in_months',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'duration_in_months')
		},
		{
			title: 'Max Redemptions',
			dataIndex: 'duration_in_months',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'duration_in_months')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => {
				return (
					<div className="text-right">
						<EllipsisDropdown menu={dropdownMenu(elm)}/>
					</div>
				)
			}
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
		const searchArray = e.currentTarget.value? list : coupons
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}
	
	if(coupons){
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
						<Button onClick={addCoupon} type="primary" icon={<PlusCircleOutlined />} block>Add coupon</Button>
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




function mapStateToProps({ couponReducer, auth }){
	const { coupons } = couponReducer;
	const { coupon } = auth;
	return { coupons, coupon };
}

const mapDispatchToProps = { getCoupons, deleteCoupon }

export default connect(mapStateToProps, mapDispatchToProps
)(CouponList);
