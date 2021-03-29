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
import { getUsers, deleteUser } from 'redux/actions/user';
import UserService from 'services/UserService';
import Loading from 'components/shared-components/Loading';
import { notification } from 'antd';
// import { notification } from 'redux/';


const { Option } = Select

const UserList = (props) => {	
	
	const { getUsers, users, user, deleteUser } = props;
	let history = useHistory();
	const [list, setList] = useState([]);
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	useEffect(() => {
		UserService.getUsers().then( ({ users }) => {
			getUsers(users);
			setList(users)
		}).catch(error => {
			notification.error({ message: 'Sorry couldn\'t fetch users, please refresh the page'});
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
	
	const addUser = () => {
		history.push(`/app/admin/users/add`)
	}
	
	const viewDetails = row => {
		history.push(`/app/admin/users/edit/${row.id}`)
	}
	
	const deleteRow = row => {
		const objKey = 'id'
		let data = list
		if(selectedRows.length > 1) {
			selectedRows.forEach(elm => {
				data = utils.deleteArrayRow(data, objKey, elm.id)
				UserService.deleteUser(elm.id).then(({ user }) => {
					setList(data)
					setSelectedRows([])
					deleteUser(user)
				});
			})
		} else {
			data = utils.deleteArrayRow(data, objKey, row.id)
			UserService.deleteUser(row.id).then(({ user }) => {
				setList(data)
				deleteUser(user)

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
			title: 'Email',
			dataIndex: 'email',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'email')
		},
		{
			title: 'Role',
			dataIndex: 'role',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'role')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => {
				if(user.id !== elm.id){
					return (
						<div className="text-right">
							<EllipsisDropdown menu={dropdownMenu(elm)}/>
						</div>
					)
				}
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
		const searchArray = e.currentTarget.value? list : users
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}
	
	if(users){
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
						<Button onClick={addUser} type="primary" icon={<PlusCircleOutlined />} block>Add user</Button>
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




function mapStateToProps({ userReducer, auth }){
	const { users } = userReducer;
	const { user } = auth;
	return { users, user };
}

const mapDispatchToProps = { getUsers, deleteUser }

export default connect(mapStateToProps, mapDispatchToProps
)(UserList);
