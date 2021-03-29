import {
	
	GET_LICENSES,
	CREATE_LICENSE,
	GET_LICENSE,
	UPDATE_LICENSE,
	DELETE_LICENSE

} from '../constants/Actions';

export const getLicenses = (licenses) => {
    return {
        type: GET_LICENSES,
        payload: licenses
    }
}

export const createLicense = (license) => {
    return {
        type: CREATE_LICENSE,
        payload: license
    }
}

export const getLicense = (license) => {
    return {
        type: GET_LICENSE,
        payload: license
    }
}

export const updateLicense = (license) => {
    return {
        type: UPDATE_LICENSE,
        payload: license
    }
}

export const deleteLicense = (license) => {
    return {
        type: DELETE_LICENSE,
        payload: license
    }
}