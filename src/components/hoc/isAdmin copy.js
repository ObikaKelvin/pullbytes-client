import React from "react";
import { connect } from "react-redux";

import { set } from "lodash";
import DataService from "../../services/DataService";
import auth from "../../redux/reducers/Auth";
import { getMe, getUsers } from "../../redux/actions/fetchData";



const isAdmin = (ChildComponent) => {
    class ComposedComponent extends React.Component {

        async redirectAway(){
            console.log(this.props)
            // const token = this.props.token;
            const token = localStorage.getItem('auth_token');

            //if jwt token exists fetch current user with the jwt token
            if(token){
                try {
                    const response = await DataService.me();
                    const resp = await DataService.getUsers();
                    getMe(response.user);
                    getUsers(resp.users);
                    // console.log(this.props.user)
                    // console.log(this.props.users)

                    if(!response.user || response.user.role !== 'admin'){
                        // localStorage.removeItem('auth_token');
                        // window.location.reload();
                    }

                    
                } catch (error) {
                    // this.props.setAlert(true, 'fail', [error.response.data.message]);
                }
            }
        }

        componentDidMount(){
            this.redirectAway()
        }

        componentDidUpdate(prevProps, prevState){
            this.redirectAway()
        }

        render(){
            return <ChildComponent {...this.props} />;
        }

    }
    const mapStateToProps = (state) => {
        // return { user: state };
        return { user: state, users: state.userReducer.users };
    }

    return connect(mapStateToProps,  { getMe, getUsers })(ComposedComponent);
    // return (ComposedComponent);
}

export default isAdmin;