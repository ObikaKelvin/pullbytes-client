import React, { useState, useEffect } from "react";
import { Row, Col, Button, Card, Table, Tag, Select, Badge, Skeleton, Result } from 'antd';
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import DataDisplayWidget from 'components/shared-components/DataDisplayWidget';
import DonutChartWidget from 'components/shared-components/DonutChartWidget'
import NumberFormat from 'react-number-format';
import { 
	CloudDownloadOutlined, 
	ArrowUpOutlined,
	ArrowDownOutlined,
	UserSwitchOutlined,
	FileDoneOutlined,
	SyncOutlined,
	BarChartOutlined
} from '@ant-design/icons';
import ChartWidget from 'components/shared-components/ChartWidget';
import { 
	topPlansData, 
	sessionColor,
	recentOrderData
} from './SalesDashboardData'
import moment from 'moment'; 
import { DATE_FORMAT_DD_MM_YYYY } from 'constants/DateConstant'
import utils from 'utils'
import SaleService from "services/SaleService";
import { COLORS } from 'constants/ChartConstant';


const { Option } = Select;

const getPaymentStatus = status => {
	if(status === 'Paid') {
		return 'success'
	}
	if(status === 'Pending') {
		return 'warning'
	}
	if(status === 'Expired') {
		return 'error'
	}
	return ''
}

const getShippingStatus = status => {
	if(status === 'Ready') {
		return 'blue'
	}
	if(status === 'Shipped') {
		return 'cyan'
	}
	return ''
}

const tableColumns = [
	{
		title: 'ID',
		dataIndex: 'id'
	},
	{
		title: 'Product',
		dataIndex: 'name',
		render: (_, record) => (
			<Flex>
				<AvatarStatus size={30} src={record.image} name={record.name}/>
			</Flex>
		),
		sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
	},
	{
		title: 'Date',
		dataIndex: 'date',
		render: (_, record) => (
			<span>{moment.unix(record.date).format(DATE_FORMAT_DD_MM_YYYY)}</span>
		),
		sorter: (a, b) => utils.antdTableSorter(a, b, 'date')
	},
	{
		title: 'Order status',
		dataIndex: 'orderStatus',
		render: (_, record) => (
			<><Tag color={getShippingStatus(record.orderStatus)}>{record.orderStatus}</Tag></>
		),
		sorter: (a, b) => utils.antdTableSorter(a, b, 'orderStatus')
	},
	{
		title: 'Payment status',
		dataIndex: 'paymentStatus',
		render: (_, record) => (
			<><Badge status={getPaymentStatus(record.paymentStatus)} /><span>{record.paymentStatus}</span></>
		),
		sorter: (a, b) => utils.antdTableSorter(a, b, 'paymentStatus')
	},
	{
		title: 'Total',
		dataIndex: 'amount',
		render: (_, record) => (
			<span className="font-weight-semibold">
				<NumberFormat
					displayType={'text'} 
					value={(Math.round(record.amount * 100) / 100).toFixed(2)} 
					prefix={'$'} 
					thousandSeparator={true} 
				/>
			</span>
		),
		sorter: (a, b) => utils.antdTableSorter(a, b, 'amount')
	}
]

const RecentOrder = () => (
	<Card title="Recent Order">
		<Table
			pagination={false}
			columns={tableColumns} 
			dataSource={recentOrderData} 
			rowKey='id'
		/>
	</Card>
)

const Home = () => {
	const [error, setError] =  useState({});
	const [topPlansData, setTopPlansData] =  useState(null);
	const [revenues, setRevenues] =  useState({
		current_month_revenue: 0,
		percent_increase: null
	});

	const [monthlyRevenues, setMonthlyRevenues] =  useState({
		data: null,
		months: null,
	});

	const [salesStats, setSalesStats] =  useState({
		total_sales: 0,
        recurring_sales: 0,
        life_time_sales: 0,
        users_count: 0
	});

	const [planStats, setPlanStats] =  useState({
		plan_revenue: null,
        plan_sales: null
	});

	let { life_time_sales, recurring_sales, total_sales } = salesStats;
	let { plan_revenue, plan_sales } = planStats;

	useEffect(() => {
		SaleService.getMonthlyRevenue().then(response => {
			setRevenues(response.revenues);
			setMonthlyRevenues(response.monthly_revenues);
		}).catch(e => {
			setError({
				revenues: 'something went wrong'
			})
		}
		)
	}, [error.revenues]);

	useEffect(() => {
		SaleService.getSalesStats().then(({ sales_stats, plan_stats }) => {
			setSalesStats(sales_stats)
			setPlanStats(plan_stats)
			setTopPlansData(plan_stats.plan_revenue)
		}).catch(e => {
			setError({
				sales_stats: 'something went wrong'
			})
		})	
		console.log(topPlansData)
	// 	SaleService.getPlansSalesStats().then(({ plan_revenue, plan_sales }) => {
	// 		// setTopPlansData(plan_revenue)
	// 		console.log(plan_sales)
	// 	}).catch(e => {
	// 		setError({
	// 			sales_stats: 'something went wrong'
	// 		})
	// 	})	
	}, [error.sales_stats]);

	const clearError = (message) => {
		setError({
			[message]: ''
		})
		console.log(error)
	}

	const displayError = (error) => {

		return (<Result
			status="warning"
			title={error}
			extra={
			  <Button type="primary" key="console" onClick={() => clearError('revenues')}>
				Go Console
			  </Button>
			}
		/>)
	}

	const TopPlans = () => {
		if(topPlansData){
			return(
				<Card 
					title="Top Plans" 
				>
					{topPlansData.map(elm => (
						<Flex className="w-100 py-3" justifyContent="between" alignItems="center" key={elm.name}>
							<span>{elm.name}</span>
							<Flex>
								<div className="mr-3 text-right">
									<span className="text-muted">Sales</span>
									<div className="mb-0 h5 font-weight-bold">
										<NumberFormat prefix={'$'} value={elm.amount} thousandSeparator={true} displayType="text" />
									</div>
								</div>
							</Flex>
						</Flex>
					))}
				</Card>
			)
		}

		return(
			<Card>
				<Skeleton active />
			</Card>
		)
	}
	

	const display_percent_increase = () => {
		
		const { percent_increase, current_month_revenue } = revenues;
		let date = new Date();
		let year = date.getFullYear();
		let month_number = date.getMonth();
		let month = date.toLocaleString('default', {month	: 'short'});
		let lastDate = new Date(year, month_number+1, 0).getDate();
		let textColor = '';
		let icon = '';
		if(percent_increase > 0) {
			textColor = 'success'; 
			icon =  <ArrowUpOutlined />; 
		}
		else if(percent_increase === 0) {
			textColor = 'primary'
			icon = ''
		}
		else{
			textColor = 'danger'; 
			icon = <ArrowDownOutlined />;
		}
		if(error.revenues){
			return displayError(error.revenues);
		}
		if(percent_increase !== null && current_month_revenue !== null){
			return(
				<>
					<div>
						<h4 className="mb-0">Monthly Revenue</h4>
						<span className="text-muted">{`1 - ${lastDate} ${month}, ${year}`}</span>
					</div>
					<div className="mb-4">
						<h1 className="font-weight-bold">${current_month_revenue}</h1>
						<p className={`text-${textColor}`}>
							<span >
								{ icon }
								<span> {percent_increase}% </span>
							</span>
							<span>growth from last month</span>
						</p>
						<p>Total gross income figure based from the date range given above.</p>
					</div>
				</>
			)

		}
		return <Skeleton active />

	}

	const displayChartWidget = () => {
		
		const { data, months } = monthlyRevenues;

		let series = [{
			name: 'Sales',
			data
		}]

		if(!data && !months){
			return <Skeleton active/>
		}
		if(error.revenues){
			return displayError(error.revenues);
		}
		return(
			<ChartWidget 
				card={false}
				series={series} 
				xAxis={months} 
				title="Unique Visitors"
				height={250}
				type="bar"
				customOptions={{colors: COLORS}}
			/>
		)
	}

	const WeeklyRevenue = () => {
		

		return(
			<Card>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24} lg={8}>
						<Flex className="h-100" flexDirection="column" justifyContent="between">
							{display_percent_increase()}
						</Flex>
					</Col>
					<Col xs={24} sm={24} md={24} lg={16}>
						<div className="mb-3 text-right">
							{/* <Button icon={<CloudDownloadOutlined/>}>Download Report</Button> */}
						</div>
						{displayChartWidget()}
					</Col>
				</Row>
			</Card>
		)
	}

	const DisplayDataSet = () => {
		
		let one_time_percent = 0;
		let recurring_percent = 0;
		console.log(recurring_sales)
		if(life_time_sales && recurring_sales){
			if(life_time_sales === 0 && recurring_sales !== 0){
				recurring_percent = 100;
				one_time_percent = 0;
			}else if(recurring_sales === 0 && life_time_sales !== 0){
				one_time_percent = 100;
				recurring_percent = 0;
			}
			else{
				total_sales = parseInt(total_sales)
				one_time_percent = parseInt(life_time_sales/total_sales * 100);
				recurring_percent = parseInt(recurring_sales/total_sales * 100);	
			}
		}
		
		return(
			<Row gutter={16}>
			<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
				<DataDisplayWidget 
					icon={<SyncOutlined />} 
					value={`${one_time_percent}%`}
					title="lifetime rate"	
					color="blue"
					vertical={true}
					avatarSize={55}
				/>
				<DataDisplayWidget 
					icon={<FileDoneOutlined />} 
					value={salesStats.total_sales}
					title="Total sales"	
					color="cyan"
					vertical={true}
					avatarSize={55}
				/>
			</Col>
			<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
				<DataDisplayWidget 
					icon={<SyncOutlined />} 
					value={`${recurring_percent}%`}
					title="Subcription rate"	
					color="blue"
					vertical={true}
					avatarSize={55}
				/>
				<DataDisplayWidget 
					icon={<UserSwitchOutlined />} 
					value={salesStats.users_count}
					title="Users"	
					color="volcano"
					vertical={true}
					avatarSize={55}
				/>
				
			</Col>
		</Row>
		)
	}

	const SalesByCategory = () => {
		
		let combinedSessionData = []
		const sessionData = []
		const sessionLabels = []
		if(plan_sales){
			for (let i = 0; i < plan_sales.length; i++) {
				const data = plan_sales[i].sale;
				sessionData.push(data);
				const label = `${plan_sales[i].name} - ${plan_sales[i].interval}`;
				sessionLabels.push(label);
				const color = sessionColor[i]
				combinedSessionData = [...combinedSessionData, {
					data: data,
					label: label,
					color: color
				}]
			}

			return(
				<DonutChartWidget 
					series={sessionData} 
					labels={sessionLabels} 
					title="Sales by Plan"
					customOptions={{colors: sessionColor}}
					extra={
						<Row  justify="center">
							<Col xs={20} sm={20} md={20} lg={24}>
								<div className="mt-4 mx-auto" style={{maxWidth: 200}}>
									{combinedSessionData.map(elm => (
										<Flex alignItems="center" justifyContent="between" className="mb-3" key={elm.label}>
											<div>
												<Badge color={elm.color} />
												<span className="text-gray-light">{elm.label}</span>
											</div>
											<span className="font-weight-bold text-dark">{elm.data}</span>
										</Flex>
									))}
								</div>
							</Col>
						</Row>
					}
				/>
			)
		}

		return (
			<Card>
				<Skeleton active />				
			</Card>
		)
	}

	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={16} xl={15} xxl={14}>
					<WeeklyRevenue />
				</Col>
				<Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={10}>
					<DisplayDataSet />
				</Col>
			</Row>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} >
					<TopPlans />
				</Col>
				<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
					<SalesByCategory />
				</Col>
			</Row>
			
		</>
	)
}

export default Home
