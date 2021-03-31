import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import UserList from './user-list/index';
import AddUser from './add-user';
import EditUser from './edit-user';


const Users = (props) => {
    const { match } = props;
    return (
		<Switch>
			{/* <Redirect exact from={`${match.url}`} to={`${match.url}`} /> */}
			<Route exact path={`${match.url}`} component={UserList} />	
			<Route exact path={`${match.url}/add`} component={AddUser} />
			<Route path={`${match.url}/edit/:id`} component={EditUser} />
		</Switch>
	)
} 

export default Users;