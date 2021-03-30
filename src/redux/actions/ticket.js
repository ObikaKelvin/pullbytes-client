import {
	GET_TICKETS,
	CREATE_TICKET,
	GET_TICKET,
	UPDATE_TICKET,
	DELETE_TICKET

} from '../constants/Actions';

export const getTickets = (tickets) => {
    return {
        type: GET_TICKETS,
        payload: tickets
    }
}

export const createTicket = (ticket) => {
    return {
        type: CREATE_TICKET,
        payload: ticket
    }
}

export const getTicket = (ticket) => {
    return {
        type: GET_TICKET,
        payload: ticket
    }
}

export const updateTicket = (ticket) => {
    return {
        type: UPDATE_TICKET,
        payload: ticket
    }
}

export const deleteTicket = (ticket) => {
    return {
        type: DELETE_TICKET,
        payload: ticket
    }
}