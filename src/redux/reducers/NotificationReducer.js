import {
	CREATE_NOTIFICATION,
	GET_NOTIFICATIONS,
	GET_NOTIFICATION,
	UPDATE_NOTIFICATION,
	DELETE_NOTIFICATION
} from '../constants/Actions';

const notificationReducer = (state = [], action) => {
	switch (action.type) {
		case CREATE_NOTIFICATION:
			return {
				...state,
				notification: action.payload
			}

		case GET_NOTIFICATIONS:
			return {
				...state,
				notifications: action.payload
			}

		case GET_NOTIFICATION:
			return {
				...state,
				notification: action.payload
			}

		case UPDATE_NOTIFICATION:
			return {
				...state,
				notification: action.payload
			}

		case DELETE_NOTIFICATION:
			return {
				...state,
				notification: action.payload
			}
		
		default:
			return state;
	}
}

export default notificationReducer