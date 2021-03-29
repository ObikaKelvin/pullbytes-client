import {
	CHECKOUT
} from '../constants/Actions';

const PaymentReducer = (state = [], action) => {
	switch (action.type) {
		case CHECKOUT:
			return {
				...state,
				paymentMethod: action.payload
			}

		
		
		default:
			return state;
	}
}

export default PaymentReducer