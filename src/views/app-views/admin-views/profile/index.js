import React, { Suspense, Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loading from 'components/shared-components/Loading';
import InnerAppLayout from 'layouts/inner-app-layout';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import Billing from './Billing';
import Notification from './Notification';



const ProfileViews = (props) => {
    const { match } = props;

    return (
		<Suspense fallback={<Loading cover="content"/>}>
			<Switch>
				<Redirect exact from={`${match.url}`} to={`${match.url}/edit-profile`} />
				<Route path={`${match.url}/edit-profile`} component={EditProfile} />
				<Route path={`${match.url}/change-password`} component={ChangePassword} />
				<Route path={`${match.url}/billing`} component={Billing} />
				<Route path={`${match.url}/notification`} component={Notification} />
			</Switch>
		</Suspense>
	)
} 

export class Setting extends Component {
	render() {
		return (
			<InnerAppLayout 
				sideContentWidth={60}
				mainContent={<ProfileViews {...this.props}/>}
			/>
    );
	}
}

export default Setting;
