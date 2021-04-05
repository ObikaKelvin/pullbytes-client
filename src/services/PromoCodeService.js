import fetch from 'auth/FetchInterceptor'

const promoCodeService = {}

promoCodeService.generatePromoCodes = function (data) {
  return fetch({
    url: '/generate_promo_codes',
    method: 'post',
    data
  })
}

promoCodeService.getPromoCodes = function () {
  return fetch({
    url: '/promo_codes',
    method: 'get'
  })
}

promoCodeService.createPromoCode = function (promoCode) {
  return fetch({
    url: '/promo_codes',
    method: 'post',
    data: promoCode
  })
}

promoCodeService.getPromoCode = function (id) {
  return fetch({
    url: `/promo_codes/${id}`,
    method: 'get'
  })
}

promoCodeService.updatePromoCode = function (id, data) {
  return fetch({
    url: `/promo_codes/${id}`,
    method: 'patch',
    data
  })
}

promoCodeService.deletePromoCode = function (id) {
  return fetch({
    url: `/promo_codes/${id}`,
    method: 'delete'
  })
}

export default promoCodeService