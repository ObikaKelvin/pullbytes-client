import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import TicketList from './ticket-list';
import AddTicket from './add-tickets';
import EditTicket from './edit-ticket';
// import AddLicense from './add-license';


const Tickets = (props) => {
    const { match } = props;
    return (
		<Switch>
			{/* <Redirect exact from={`${match.url}`} to={`${match.url}`} /> */}
			<Route exact path={`${match.url}`} component={TicketList} />	
			<Route exact path={`${match.url}/add`} component={AddTicket} />
			<Route path={`${match.url}/edit/:id`} component={EditTicket} />
		</Switch>
	)
} 

export default Tickets;