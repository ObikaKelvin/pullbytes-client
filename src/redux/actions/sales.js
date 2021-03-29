import {
	
    GET_MONTHLY_REVENUE,
    GET_SALES_STATS

} from '../constants/Actions';

export const getMonthlyRevenue = (monthly_revenue) => {
    return {
        type: GET_MONTHLY_REVENUE,
        payload: monthly_revenue
    }
}

export const getSalesStats = (sales_stats) => {
    return {
        type: GET_SALES_STATS,
        payload: sales_stats
    }
}