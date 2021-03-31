import React, {useState, useEffect} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Spin, Tag } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import { useHistory } from "react-router-dom";
import utils from 'utils';
import { connect } from 'react-redux';
import { getTickets, deleteTicket } from 'redux/actions/ticket';
import TicketService from 'services/TicketService';
import Loading from 'components/shared-components/Loading';


const TicketList = (props) => {	
	
	const { getTickets, tickets } = props;
	let history = useHistory();
	const [list, setList] = useState([]);
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	useEffect(() => {
		TicketService.getTickets().then( ({ tickets }) => {
			getTickets(tickets);
			setList(tickets)
		}).catch(error => {
			console.log(error)
		})
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
	
	const createTicket = () => {
		history.push(`/app/admin/tickets/add`)
	}
	
	const viewDetails = row => {
		history.push(`/app/admin/tickets/edit/${row.id}`)
	}
	
	const deleteRow = row => {
		const objKey = 'id'
		let data = list
		if(selectedRows.length > 1) {
			selectedRows.forEach(elm => {
				data = utils.deleteArrayRow(data, objKey, elm.id)
				TicketService.deleteTicket(elm.id).then(resp => {
					console.log(resp)
					setList(data)
					setSelectedRows([])
					deleteTicket([]);
				});
			})
		} else {
			data = utils.deleteArrayRow(data, objKey, row.id)
			TicketService.deleteTicket(row.id).then(resp => {
				setList(data)
				deleteTicket(data)
			});
		}
	}

	const getTicketStatus = status => {
		if(status === 'solved') {
			return 'green'
		}
		else {
			return 'red'
		}
		return ''
	}

	let i = 1;

	const tableColumns = [
		{
			title: 'Title',
			dataIndex: 'title',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'title')
		},
		{
			title: 'Message',
			dataIndex: 'message',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'message')
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (_, record) => (
				<><Tag color={getTicketStatus(record.status)}>{record.status}</Tag></>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'status'),
		},
		{
			title: 'Created At',
			dataIndex: 'created_at',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'created_at'),
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
		const searchArray = e.currentTarget.value? list : tickets
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}
	
	if(tickets){
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
						<Button onClick={createTicket} type="primary" icon={<PlusCircleOutlined />} block>Create Ticket</Button>
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




function mapStateToProps({ ticketReducer }){
	const { tickets } = ticketReducer;
	return { tickets };
}

const mapDispatchToProps = { getTickets }

export default connect(mapStateToProps, mapDispatchToProps
)(TicketList);
