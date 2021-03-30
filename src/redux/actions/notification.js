import {
	GET_NOTIFICATIONS,
	CREATE_NOTIFICATION,
	GET_NOTIFICATION,
	UPDATE_NOTIFICATION,
	DELETE_NOTIFICATION

} from '../constants/Actions';

export const getNotifications = (notifications) => {
    return {
        type: GET_NOTIFICATIONS,
        payload: notifications
    }
}

export const createNotification = (notification) => {
    return {
        type: CREATE_NOTIFICATION,
        payload: notification
    }
}

export const getNotification = (notification) => {
    return {
        type: GET_NOTIFICATION,
        payload: notification
    }
}

export const updateNotification = (notification) => {
    return {
        type: UPDATE_NOTIFICATION,
        payload: notification
    }
}

export const deleteNotification = (notification) => {
    return {
        type: DELETE_NOTIFICATION,
        payload: notification
    }
}