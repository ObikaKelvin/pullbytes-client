import React from 'react'
import CouponForm from '../CouponForm';

const EditUser = props => {
	return (
		<CouponForm mode="EDIT" param={props.match.params} />
	)
}

export default EditUser
