import fetch from 'auth/FetchInterceptor'

const planService = {}

planService.getMonthlyRevenue = function (id) {
  return fetch({
    url: `/monthly_revenue`,
    method: 'get'
  })
}

planService.getSalesStats = function (id) {
  return fetch({
    url: `/sales_stats`,
    method: 'get'
  })
}

planService.getPlansSalesStats = function (id) {
  return fetch({
    url: `/get_plan_sales_stats`,
    method: 'get'
  })
}

export default planService