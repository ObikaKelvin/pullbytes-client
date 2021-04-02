import fetch from 'auth/FetchInterceptor'

const PaymentService = {}

PaymentService.checkout = function (data) {
  return fetch({
    url: `/checkout`,
    method: 'post',
    data: data
  })
}

PaymentService.getSetupIntent = function (id, data) {
  return fetch({
    url: `/me/get_intent/`,
    method: 'get',
    data
  })
}

export default PaymentService