import {
	GET_PLANS,
	CREATE_PLAN,
	GET_PLAN,
	UPDATE_PLAN,
	DELETE_PLAN

} from '../constants/Actions';

export const getPlans = (plans) => {
    return {
        type: GET_PLANS,
        payload: plans
    }
}

export const createPlan = (plan) => {
    return {
        type: CREATE_PLAN,
        payload: plan
    }
}

export const getPlan = (plan) => {
    return {
        type: GET_PLAN,
        payload: plan
    }
}

export const updatePlan = (plan) => {
    return {
        type: UPDATE_PLAN,
        payload: plan
    }
}

export const deletePlan = (plan) => {
    return {
        type: DELETE_PLAN,
        payload: plan
    }
}