import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotificationList from '.';


const Tickets = (props) => {
    const { match } = props;
    return (
		<Switch>
			{/* <Redirect exact from={`${match.url}`} to={`${match.url}`} /> */}
			<Route exact path={`${match.url}`} component={NotificationList} />	
		</Switch>
	)
} 

export default Tickets;