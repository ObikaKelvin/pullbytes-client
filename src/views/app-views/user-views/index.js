import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';


const UserViews = (props) => {
    const { match } = props;

    return (
		<Suspense fallback={<Loading cover="content"/>}>
			<Switch>
				<Redirect exact from={`${match.url}`} to={`${match.url}/licenses`} />
				{/* <Route path={`${match.url}/home`} component={lazy(() => import(`./home`))} /> */}
				<Route path={`${match.url}/licenses`} component={lazy(() => import(`./licenses`))} />
				<Route path={`${match.url}/plans`} component={lazy(() => import(`./plans`))} />
				<Route path={`${match.url}/profile`} component={lazy(() => import(`./profile`))} />
				<Route path={`${match.url}/tickets`} component={lazy(() => import(`./tickets`))} />
				<Route path={`${match.url}/notifications`} component={lazy(() => import(`./notifications`))} />
				<Route path={`${match.url}/checkout`} component={lazy(() => import(`./checkout`))} />
				<Route path={`${match.url}/signout`} component={lazy(() => import(`./signout`))} />
				{/* <Route path="*" exact component={lazy(() => import(`./home`))} /> */}
				
			</Switch>
		</Suspense>
	)
} 

export default UserViews;