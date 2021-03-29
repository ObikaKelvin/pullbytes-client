import fetch from 'auth/FetchInterceptor'

const planService = {}

planService.getPlans = function () {
  return fetch({
    url: '/plans',
    method: 'get'
  })
}

planService.getPlan = function (id) {
  return fetch({
    url: `/plans/${id}`,
    method: 'get'
  })
}

planService.createPlan = function (data) {
  return fetch({
    url: '/plans',
    method: 'post',
    data: data
  })
}

planService.updatePlan = function (id, data) {
  return fetch({
    url: `/plans/${id}`,
    method: 'put',
    data
  })
}

planService.deletePlan = function (id) {
  return fetch({
    url: `/plans/${id}`,
    method: 'delete'
  })
}

export default planService