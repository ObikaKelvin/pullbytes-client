import React from 'react'
import LicenseForm from '../LicenseForm';

const EditUser = props => {
	console.log('mode')
	return (
		<LicenseForm mode="EDIT" param={props.match.params} />
	)
}

export default EditUser
