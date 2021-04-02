import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import CouponList from './coupon-list';
import AddCoupon from './add-coupon';
import EditCoupon from './edit-coupon';

const Coupons = (props) => {
    const { match } = props;
    return (
		<Switch>
			{/* <Redirect exact from={`${match.url}`} to={`${match.url}`} /> */}
			<Route exact path={`${match.url}`} component={CouponList} />	
			<Route exact path={`${match.url}/add`} component={AddCoupon} />	
			<Route exact path={`${match.url}/edit/:id`} component={EditCoupon} />	
		</Switch>
	)
} 

export default Coupons;