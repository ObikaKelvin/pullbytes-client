import {
 
    GET_PROMO_CODES,
	CREATE_PROMO_CODE,
	GET_PROMO_CODE,
	UPDATE_PROMO_CODE,
	DELETE_PROMO_CODE
	
} from '../constants/Actions';

export const getCoupons = (promoCodes) => {
    return {
        type: GET_PROMO_CODES,
        payload: promoCodes
    }
}

export const createCoupon = (promoCode) => {
    return {
        type: CREATE_PROMO_CODE,
        payload: promoCode
    }
}

export const getCoupon = (promoCode) => {
    return {
        type: GET_PROMO_CODE,
        payload: promoCode
    }
}

export const updateCoupon = (promoCode) => {
    return {
        type: UPDATE_PROMO_CODE,
        payload: promoCode
    }
}

export const deleteCoupon = (promoCode) => {
    return {
        type: DELETE_PROMO_CODE,
        payload: promoCode
    }
}

