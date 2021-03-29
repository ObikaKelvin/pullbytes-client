import {
	CREATE_SUBSCRIPTION,
	GET_SUBSCRIPTIONS,
	GET_SUBSCRIPTION,
	UPDATE_SUBSCRIPTION,
	DELETE_SUBSCRIPTION
} from '../constants/Actions';

const SubscriptionReducer = (state = [], action) => {
	switch (action.type) {
		case CREATE_SUBSCRIPTION:
			return {
				...state,
				subscription: action.payload
			}

		case GET_SUBSCRIPTIONS:
			return {
				...state,
				subscriptions: action.payload
			}

		case GET_SUBSCRIPTION:
			return {
				...state,
				subscription: action.payload
			}

		case UPDATE_SUBSCRIPTION:
			return {
				...state,
				subscription: action.payload
			}

		case DELETE_SUBSCRIPTION:
			return {
				...state,
				subscription: action.payload
			}
		
		default:
			return state;
	}
}

export default SubscriptionReducer