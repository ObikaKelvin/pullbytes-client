import {
	CREATE_PROMO_CODE,
	GET_PROMO_CODES,
	GET_PROMO_CODE,
	UPDATE_PROMO_CODE,
	DELETE_PROMO_CODE
} from '../constants/Actions';

const PromoCodeReducer = (state = [], action) => {
	switch (action.type) {
		case CREATE_PROMO_CODE:
			return {
				...state,
				promoCode: action.payload
			}

		case GET_PROMO_CODES:
			return {
				...state,
				promoCodes: action.payload
			}

		case GET_PROMO_CODE:
			return {
				...state,
				promoCode: action.payload
			}

		case UPDATE_PROMO_CODE:
			return {
				...state,
				promoCode: action.payload
			}

		case DELETE_PROMO_CODE:
			return {
				...state,
				promoCode: action.payload
			}
		
		default:
			return state;
	}
}

export default PromoCodeReducer