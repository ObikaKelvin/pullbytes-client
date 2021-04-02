import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from 'components/shared-components/Loading';


const AdminViews = (props) => {
    const { match } = props;
    return (

		<Suspense fallback={<Loading cover="content"/>}>
			<Switch>
				<Redirect exact from={`${match.url}`} to={`${match.url}/home`} />
				{/* <Route path={`${match.url}`} component={Home} /> */}
				
				<Route path={`${match.url}/home`} component={lazy(() => import(`./home`))} />
				<Route path={`${match.url}/plans`} component={lazy(() => import(`./plans`))} />
				<Route path={`${match.url}/users`} component={lazy(() => import(`./users`))} />
				<Route path={`${match.url}/licenses`} component={lazy(() => import(`./licenses`))} />
				<Route path={`${match.url}/tickets`} component={lazy(() => import(`./tickets`))} />
				<Route path={`${match.url}/subscriptions`} component={lazy(() => import(`./subscriptions`))} />
				<Route path={`${match.url}/coupons`} component={lazy(() => import(`../admin-views/coupons`))} />
				<Route path={`${match.url}/profile`} component={lazy(() => import(`./profile`))} />
				<Route path={`${match.url}/signout`} component={lazy(() => import(`./signout`))} />
			</Switch>
		</Suspense>
	)
}

export default connect(null)(AdminViews);