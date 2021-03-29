import fetch from 'auth/FetchInterceptor'

const PaymentService = {}

PaymentService.checkout = function (data) {
  return fetch({
    url: `/checkout`,
    method: 'post',
    data: data
  })
}

export default PaymentService