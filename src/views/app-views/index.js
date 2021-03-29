import React, { lazy, Suspense, useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import { AUTH_PREFIX_PATH } from 'configs/AppConfig'
import isAdmin from '../../components/hoc/isAdmin'
import { AUTH_TOKEN } from 'redux/constants/Auth'
import DataService from '../../services/DataService'



export const AppViews = (props) => {

  const [path, setPath] = useState('');
  const [authUser, setAuthUser] = useState('');
  const { user } = props;

  const jwtToken = localStorage.getItem(AUTH_TOKEN)
  const history = useHistory();

  if(!jwtToken){
    history.push(`/auth/login`);
  }

  useEffect(() => {
    // if(user){
      console.log(user)
      if(user && user.role === "admin"){
        history.push('/app/admin')
        console.log(`user role: ${user.role}`)
      }
      // else if(user && user.role === "customer"){
      //   history.push('/app/user')
      // }

      // else{
      //   history.push('/app')
      // }
    // }
    
  }, [user])

  
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/admin`} component={lazy(() => import(`./admin-views`))} />
        <Route path={`${APP_PREFIX_PATH}/user`} component={lazy(() => import(`./user-views`))} />

				{user && user.role === 'customer' && <Redirect exact from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/user`} />}
        {user && user.role === 'admin' && <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/admin`} />}
      </Switch>
    </Suspense>
  )
}

const mapStateToProps = ({ auth }) => {
	const {user} = auth;
	return {user}
}

export default React.memo(connect(mapStateToProps)(AppViews));