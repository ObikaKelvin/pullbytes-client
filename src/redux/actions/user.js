import {
 
    GET_USERS,
	CREATE_USER,
	GET_USER,
	UPDATE_USER,
	DELETE_USER,

	GET_ME,
	UPDATE_ME,
	UPDATE_PASSWORD,
	DELETE_ME,
	
} from '../constants/Actions';

export const getUsers = (users) => {
    return {
        type: GET_USERS,
        payload: users
    }
}

export const createUser = (user) => {
    return {
        type: CREATE_USER,
        payload: user
    }
}

export const getUser = (user) => {
    return {
        type: GET_USER,
        payload: user
    }
}

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export const deleteUser = (user) => {
    return {
        type: DELETE_USER,
        payload: user
    }
}

export const getMe = (user) => {
    return {
        type: GET_ME,
        payload: user
    }
}

export const updateMe = (user) => {
    return {
        type: UPDATE_ME,
        payload: user
    }
}

export const updatePassword = (user) => {
    return {
        type: UPDATE_PASSWORD,
        payload: user
    }
}

export const deleteMe = (user) => {
    return {
        type: DELETE_ME,
        payload: user
    }
}
