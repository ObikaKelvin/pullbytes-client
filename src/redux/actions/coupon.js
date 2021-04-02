import {
 
    GET_COUPONS,
	CREATE_COUPON,
	GET_COUPON,
	UPDATE_COUPON,
	DELETE_COUPON
	
} from '../constants/Actions';

export const getCoupons = (coupons) => {
    return {
        type: GET_COUPONS,
        payload: coupons
    }
}

export const createCoupon = (coupon) => {
    return {
        type: CREATE_COUPON,
        payload: coupon
    }
}

export const getCoupon = (coupon) => {
    return {
        type: GET_COUPON,
        payload: coupon
    }
}

export const updateCoupon = (coupon) => {
    return {
        type: UPDATE_COUPON,
        payload: coupon
    }
}

export const deleteCoupon = (coupon) => {
    return {
        type: DELETE_COUPON,
        payload: coupon
    }
}

