import React, { useState, useEffect } from 'react';
import LicenseForm from '../LicenseForm';
import DataService from 'services/DataService';
// import { } from 'redux/actions/fetchData';

const AddLicense = () => {
	// const [plans, setPlans] = useState([]);

	// useEffect(() => {
	// 	DataService.getPlans().then(response => {
	// 		console.log(response)
	// 		setPlans(response.plans);
	// 	});
	// }, [])

	return (
		<LicenseForm mode="ADD" />
	)
}

export default AddLicense
