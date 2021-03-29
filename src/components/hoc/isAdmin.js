import React from "react";
import { connect } from "react-redux";

import { set } from "lodash";
import UserService from "../../services/UserService";
import auth from "../../redux/reducers/Auth";



const isAdmin = (ChildComponent) => {
    class ComposedComponent extends React.Component {

        async redirectAway(){
            // const token = this.props.token;
            const token = localStorage.getItem('auth_token');

            //if jwt token exists fetch current user with the jwt token
            if(token){
                try {
                    const response = await UserService.me;

                    if(!response.user){
                        localStorage.removeItem('auth_token');
                        window.location.reload();
                    }

                    if(response.user.role !== 'admin'){
                        localStorage.removeItem('auth_token');
                        window.location.reload();
                        console.log('not admin')
                        this.props.history.push('/app/user')
                        return
                    }

                    // this.props.history('/admin')

                    
                } catch (error) {
                    // this.props.setAlert(true, 'fail', [error.response.data.message]);
                }
            }
        }

        async componentDidMount(){
            await this.redirectAway()
        }

        async componentDidUpdate(prevProps, prevState){
            await this.redirectAway()
        }

        render(){
            return <ChildComponent {...this.props} />;
        }

    }
    const mapStateToProps = ({ auth }) => {
        const { user } = auth;
        return { user };
    }

    return connect(mapStateToProps)(ComposedComponent);
    // return (ComposedComponent);
}

export default isAdmin;