import fetch from 'auth/FetchInterceptor'

const subscriptionService = {}

subscriptionService.renewSubscription = function (id, data) {
  return fetch({
    url: `/me/renew_subscription/${id}`,
    method: 'patch',
    data
  })
}

subscriptionService.cancelSubscription = function (id, data) {
    return fetch({
      url: `/me/cancel_subscription/${id}`,
      method: 'patch',
      data
    })
  }


export default subscriptionService