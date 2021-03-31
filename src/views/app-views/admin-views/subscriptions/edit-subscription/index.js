import React from 'react'
import SubscriptionForm from '../SubscriptionForm';

const EditSubscription = props => {
	return (
		<SubscriptionForm mode="EDIT" param={props.match.params} />
	)
}

export default EditSubscription
