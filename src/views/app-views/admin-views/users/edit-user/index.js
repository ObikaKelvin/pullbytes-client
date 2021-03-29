import React from 'react'
import UserForm from '../UserForm';

const EditUser = props => {
	console.log('mode')
	return (
		<UserForm mode="EDIT" param={props.match.params} />
	)
}

export default EditUser
