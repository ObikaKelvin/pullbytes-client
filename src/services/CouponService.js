import fetch from 'auth/FetchInterceptor'

const couponService = {}

couponService.getCoupons = function () {
  return fetch({
    url: '/coupons',
    method: 'get'
  })
}

couponService.createCoupon = function (coupon) {
  return fetch({
    url: '/coupons',
    method: 'post',
    data: coupon
  })
}

couponService.getCoupon = function (id) {
  return fetch({
    url: `/coupons/${id}`,
    method: 'get'
  })
}

couponService.updateCoupon = function (id, data) {
  return fetch({
    url: `/coupons/${id}`,
    method: 'patch',
    data
  })
}

couponService.deleteCoupon = function (id) {
  return fetch({
    url: `/coupons/${id}`,
    method: 'delete'
  })
}

export default couponService