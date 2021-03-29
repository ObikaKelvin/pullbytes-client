import React from 'react'
import PlanForm from '../PlanForm';

const EditPlan = props => {
	return (
		<PlanForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditPlan
