import {
	CREATE_TICKET,
	GET_TICKETS,
	GET_TICKET,
	UPDATE_TICKET,
	DELETE_TICKET
} from '../constants/Actions';

const ticketReducer = (state = [], action) => {
	switch (action.type) {
		case CREATE_TICKET:
			return {
				...state,
				ticket: action.payload
			}

		case GET_TICKETS:
			return {
				...state,
				tickets: action.payload
			}

		case GET_TICKET:
			return {
				...state,
				ticket: action.payload
			}

		case UPDATE_TICKET:
			return {
				...state,
				ticket: action.payload
			}

		case DELETE_TICKET:
			return {
				...state,
				ticket: action.payload
			}
		
		default:
			return state;
	}
}

export default ticketReducer