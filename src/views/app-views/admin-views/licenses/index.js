import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LicenseList from './license-list/index';
import AddUser from './add-license';
import EditUser from './edit-license';


const Licenses = (props) => {
    const { match } = props;
    return (
		<Switch>
			{/* <Redirect exact from={`${match.url}`} to={`${match.url}`} /> */}
			<Route exact path={`${match.url}`} component={LicenseList} />	
			<Route exact path={`${match.url}/add`} component={AddUser} />
			<Route path={`${match.url}/edit/:id`} component={EditUser} />
		</Switch>
	)
} 

export default Licenses;