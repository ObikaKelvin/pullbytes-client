import {
	CREATE_LICENSE,
	GET_LICENSES,
	GET_LICENSE,
	UPDATE_LICENSE,
	DELETE_LICENSE
} from '../constants/Actions';

const LicenseReducer = (state = [], action) => {
	switch (action.type) {
		case CREATE_LICENSE:
			return {
				...state,
				license: action.payload
			}

		case GET_LICENSES:
			return {
				...state,
				licenses: action.payload
			}

		case GET_LICENSE:
			return {
				...state,
				license: action.payload
			}

		case UPDATE_LICENSE:
			return {
				...state,
				license: action.payload
			}

		case DELETE_LICENSE:
			return {
				...state,
				license: action.payload
			}
		
		default:
			return state;
	}
}

export default LicenseReducer