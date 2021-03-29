import fetch from 'auth/FetchInterceptor'

const dataService = {}

dataService.getUsers = function () {
  return fetch({
    url: '/users',
    method: 'get'
  })
}

dataService.createUser = function (user) {
  return fetch({
    url: '/users_file',
    method: 'post',
    data: user
  })
}

dataService.getUser = function (id) {
  return fetch({
    url: `/users/${id}`,
    method: 'get'
  })
}

dataService.getUser = function (id) {
  return fetch({
    url: `/users/${id}`,
    method: 'get'
  })
}

dataService.me = function () {
  return fetch({
    url: `/me`,
    method: 'post'
  })
}

dataService.updateUser = function (id, data) {
  return fetch({
    url: `/users/${id}`,
    method: 'patch',
    data
  })
}

dataService.updateMe = function (data) {
  return fetch({
    url: `/update_me`,
    method: 'patch',
    data
  })
}

dataService.updatePassword = function (data) {
  return fetch({
    url: `/update_password`,
    method: 'patch',
    data
  })
}

dataService.deleteUser = function (id) {
  return fetch({
    url: `/users/${id}`,
    method: 'delete'
  })
}

dataService.deleteMe = function () {
  return fetch({
    url: `/delete_me`,
    method: 'delete',
  })
}

dataService.getPlans = function () {
  return fetch({
    url: '/plans',
    method: 'get'
  })
}

dataService.getPlan = function (id) {
  return fetch({
    url: `/plans/${id}`,
    method: 'get'
  })
}

dataService.createPlan = function (data) {
  return fetch({
    url: '/plans',
    method: 'post',
    data: data
  })
}

dataService.updatePlan = function (id, data) {
  return fetch({
    url: `/plans/${id}`,
    method: 'put',
    data
  })
}

dataService.deletePlan = function (id) {
  return fetch({
    url: `/plans/${id}`,
    method: 'delete'
  })
}

dataService.getLicenses = function () {
  return fetch({
    url: '/licenses',
    method: 'get'
  })
}

dataService.getLicense = function (id) {
  return fetch({
    url: `/licenses/${id}`,
    method: 'get'
  })
}

dataService.createLicense = function (data) {
  return fetch({
    url: '/licenses',
    method: 'post',
    data: data
  })
}

dataService.updateLicense = function (id, data) {
  return fetch({
    url: `/licenses/${id}`,
    method: 'put',
    data
  })
}

dataService.deleteLicense = function (id) {
  return fetch({
    url: `/licenses/${id}`,
    method: 'delete'
  })
}

dataService.getSubscriptions = function () {
  return fetch({
    url: '/subscriptions',
    method: 'get'
  })
}

dataService.getSubscription = function (id) {
  return fetch({
    url: `/subscriptions/${id}`,
    method: 'get'
  })
}

dataService.createSubscription = function (data) {
  return fetch({
    url: '/subscriptions',
    method: 'post',
    data: data
  })
}

dataService.updateSubscription = function (id, data) {
  return fetch({
    url: `/subscriptions/${id}`,
    method: 'put',
    data
  })
}

dataService.deleteSubscription = function (id) {
  return fetch({
    url: `/subscriptions/${id}`,
    method: 'delete'
  })
}

dataService.getMonthlyRevenue = function (id) {
  return fetch({
    url: `/monthly_revenue`,
    method: 'get'
  })
}

dataService.getSalesStats = function (id) {
  return fetch({
    url: `/sales_stats`,
    method: 'get'
  })
}

export default dataService