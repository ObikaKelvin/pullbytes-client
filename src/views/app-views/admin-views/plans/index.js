import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PlanList from './plan-list';
import AddPlan from './add-plan';
import EditPlan from './edit-plan';


const Plan = (props) => {
    const { match } = props;

    return (
		<Switch>
			{/* <Redirect exact from={`${match.url}`} to={`${match.url}`} /> */}
			<Route path={`${match.url}/add`} component={AddPlan} />
			<Route path={`${match.url}/edit/:id`} component={EditPlan} />
			<Route path={`${match.url}`} component={PlanList} />	
		</Switch>
	)
} 

export default Plan;