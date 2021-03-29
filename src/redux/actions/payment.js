import {
	CHECKOUT,
	

} from '../constants/Actions';

export const checkOut = (stripe_token) => {
    return {
        type: CHECKOUT,
        payload: stripe_token
    }
}

