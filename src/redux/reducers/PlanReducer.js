import {
	CREATE_PLAN,
	GET_PLANS,
	GET_PLAN,
	UPDATE_PLAN,
	DELETE_PLAN
} from '../constants/Actions';

const planReducer = (state = [], action) => {
	switch (action.type) {
		case CREATE_PLAN:
			return {
				...state,
				plan: action.payload
			}

		case GET_PLANS:
			return {
				...state,
				plans: action.payload
			}

		case GET_PLAN:
			return {
				...state,
				plan: action.payload
			}

		case UPDATE_PLAN:
			return {
				...state,
				plan: action.payload
			}

		case DELETE_PLAN:
			return {
				...state,
				plan: action.payload
			}
		
		default:
			return state;
	}
}

export default planReducer