import {
	GET_MONTHLY_REVENUE,
	GET_SALES_STATS
} from '../constants/Actions';

const SalesReducer = (state = [], action) => {
	switch (action.type) {
		case GET_MONTHLY_REVENUE:
			return {
				...state,
				plan: action.payload
			}

		case GET_SALES_STATS:
			return {
				...state,
				plans: action.payload
			}

		default:
			return state;
	}
}

export default SalesReducer