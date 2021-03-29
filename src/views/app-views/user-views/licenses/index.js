import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import LicenseList from './license-list';
import EditLicense from './edit-license';


const Licenses = (props) => {
    const { match } = props;
    return (
		<Switch>
			{/* <Redirect exact from={`${match.url}`} to={`${match.url}`} /> */}
			<Route exact path={`${match.url}`} component={LicenseList} />	
			<Route path={`${match.url}/edit/:id`} component={EditLicense} />
		</Switch>
	)
} 

export default Licenses;