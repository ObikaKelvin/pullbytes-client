import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import planService from 'services/PlanService'
import { Row, Col, Card, Grid, Button, Badge, Switch, Skeleton } from 'antd';
import { pricingData } from './pricingData';
import utils from 'utils';
import Flex from 'components/shared-components/Flex'
import { getPlan } from 'redux/actions/plan'

const { useBreakpoint } = Grid;


const Plans = (props) => {
	const [plans, setPlans] = useState([]);
	const [planType, setPlanType] = useState('recurring');
	const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
	const colCount = pricingData.length
	const history = useHistory();
	console.log('isMobile', isMobile)

	useEffect(() => {
		console.log(planService)
		planService.getPlans().then(({ plans }) => {
			setPlans(plans);
		}).catch(err => {
			console.log(err)
		})
	}, []);

	const onSelectPlan = id => e => {
		const plan = plans.find(plan => plan.id === id);
		props.getPlan(plan);
		history.push('/app/user/checkout')
	}

	const displayPricing = () => {
		if(plans){
			return plans.map((elm , i) => {
				const features = JSON.parse(elm.features)
				if(elm.type === planType){
					return (
						<Col key={`price-column-${i}`} xs={24} sm={24} md={24/colCount} lg={24/colCount} className={colCount === (i + 1) || isMobile ? '' : 'border-right'}>
							<div className="p-3">
								<div className="text-center">
									{/* <img className="img-fluid" src={elm.image} alt="" /> */}
									<h1 className="display-4 mt-4"> 
										<span className="font-size-md d-inline-block mr-1" style={{transform: 'translate(0px, -17px)'}}>$</span>
										<span>{elm.price}</span>
									</h1>
									<p className="mb-0">{elm.interval}</p>
								</div>
								<div className="mt-4">
									<h2 className="text-center font-weight-semibold">{elm.name}</h2>
								</div>
								<div className="d-flex justify-content-center mt-3">
									<div>
										{
											features.map((elm , i) => {
												return (
													<p key={`pricing-feature-${i}`}>
														<Badge color={'blue'} />
														<span>{elm}</span>
													</p>
												)
											})
										}
									</div>
								</div>
								<div className="mt-3 text-center">
									<Button type="default" data-id={elm.id} onClick={onSelectPlan(elm.id)}>Get Started</Button>
								</div>
							</div>
						</Col>
					)
				}
				
			})
		}

		return <Skeleton active/>
	}

	const onChangePricing = () => {
		if(planType === 'recurring'){
			setPlanType('lifetime');
		}
		else{
			setPlanType('recurring');
		}
	}

	return (
		<Card>
			<div className="container">
				<div className="text-center mb-4">
					<h2 className="font-weight-semibold">Pick a base plan</h2>
					<Row type="flex" justify="center">
						<Col sm={24} md={12} lg={8}>
							<p>
								Pick a plan that best suites your needs.
							</p>
						</Col>
					</Row>
				</div>
				<Flex justifyContent="center" alignItems="center">		
					<h3 className="mr-4">Yearly</h3>		
					<Switch onChange={onChangePricing} />
					<h3 className="ml-4">lifetime</h3>		

				</Flex>		
				<Row>
					{
						displayPricing()
					}
				</Row>
				<div className="mt-5 pt-lg-4">
					<h1 className="text-center font-weight-light">Frequently Asked Questions</h1>
				</div>
				<Row gutter={60} className="mt-5">
					<Col sm={24} md={12} lg={12}>
						<div className="mb-5">
							<h3 className="font-weight-semibold">Is it expensive?</h3>
							<p>
								Twitch tail in permanent irritation poop on grasses, drink water out of the faucet,
								plays league of legends have my breakfast spaghetti yarn. 
								Taco cat backwards spells taco cat stick butt in face.
							</p>
						</div>
						<div className="mb-5">
							<h3 className="font-weight-semibold">Is it secure?</h3>
							<p>
								Splice the main brace Jolly Roger me hogshead prow red ensign ye swing the lead log ho. Handsomely spanker
								dance the hempen jig pinnace overhaul crimp tack booty rigging lateen sail.
								Sea Legs boatswain hempen halter provost bilge rat ballast maroon man-of-war bowsprit Chain Shot.
							</p>
						</div>
					</Col>
					<Col sm={24} md={12} lg={12}>
						<div className="mb-5">
							<h3 className="font-weight-semibold">How to start?</h3>
							<p>
								Purr like an angel nap all day, for poop on grasses for chase after silly colored fish toys
								around the house stares at human while pushing stuff off a table or i heard this rumor where
								the humans are our owners.
							</p>
						</div>
						<div className="mb-5">
							<h3 className="font-weight-semibold">Is there any discount?</h3>
							<p>
								Cry louder at reflection. More napping, more napping all the napping is exhausting toilet
								paper attack claws fluff everywhere meow miao french ciao litterbox.
							</p>
						</div>
					</Col>
				</Row>
			</div>
		</Card>
	)
}

const mapDispatchToProps = {
	getPlan
}

export default connect(null, mapDispatchToProps)(Plans)

