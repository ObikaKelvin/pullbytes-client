import {
	CREATE_USER,
	GET_USERS,
	GET_USER,
	GET_ME,
	UPDATE_USER,
	UPDATE_PASSWORD,
	DELETE_USER
} from '../constants/Actions';

const UserReducer = (state = [], action) => {
	switch (action.type) {
		case CREATE_USER:
			return {
				...state,
				user: action.payload
			}

		case GET_USERS:
			return {
				...state,
				users: action.payload
			}

		case GET_ME:
			return {
				...state,
				user: action.payload
			}

		case GET_USER:
			return {
				...state,
				user: action.payload
			}

		case UPDATE_USER:
			return {
				...state,
				user: action.payload
			}

		case UPDATE_PASSWORD:
		return {
			...state,
			user: action.payload
		}

		case DELETE_USER:
			return {
				...state,
				user: action.payload
			}
		
		default:
			return state;
	}
}

export default UserReducer