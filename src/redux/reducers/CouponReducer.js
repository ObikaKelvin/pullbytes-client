import {
	CREATE_COUPON,
	GET_COUPONS,
	GET_COUPON,
	UPDATE_COUPON,
	DELETE_COUPON
} from '../constants/Actions';

const CouponReducer = (state = [], action) => {
	switch (action.type) {
		case CREATE_COUPON:
			return {
				...state,
				coupon: action.payload
			}

		case GET_COUPONS:
			return {
				...state,
				coupons: action.payload
			}

		case GET_COUPON:
			return {
				...state,
				coupon: action.payload
			}

		case UPDATE_COUPON:
			return {
				...state,
				coupon: action.payload
			}

		case DELETE_COUPON:
			return {
				...state,
				coupon: action.payload
			}
		
		default:
			return state;
	}
}

export default CouponReducer