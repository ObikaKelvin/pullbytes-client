import React from 'react'
import SubscriptionForm from '../SubscriptionForm';

const EditSubscription = props => {
	console.log('mode')
	return (
		<SubscriptionForm mode="EDIT" param={props.match.params} />
	)
}

export default EditSubscription
