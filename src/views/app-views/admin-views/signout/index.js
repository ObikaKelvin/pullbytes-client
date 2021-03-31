import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { AUTH_TOKEN } from 'redux/constants/Auth';
import { signOut } from 'redux/actions/Auth';
import JwtAuthService from 'services/JwtAuthService';

const SignOut = (props) => {
    const { signOut } = props;
    const history = useHistory();
    

    useEffect(() => {
        localStorage.removeItem(AUTH_TOKEN);
        history.push('/auth/login');
        // JwtAuthService.signOut(response => {
        //     localStorage.removeItem(AUTH_TOKEN);
        //     signOut();
        //     history.push('/auth/login');
    
        // }).catch(error => {
    
        // });
    }, [])

    return (
		<>
				
		</>
	)
} 

const mapDispatchToProps = {
    signOut
}

export default connect(null, mapDispatchToProps)(SignOut);