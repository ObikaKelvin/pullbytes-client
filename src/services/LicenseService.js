import fetch from 'auth/FetchInterceptor'

const licenseService = {}

licenseService.getLicenses = function () {
  return fetch({
    url: '/licenses',
    method: 'get'
  })
}

licenseService.getLicense = function (id) {
  return fetch({
    url: `/licenses/${id}`,
    method: 'get'
  })
}

licenseService.createLicense = function (data) {
  return fetch({
    url: '/licenses',
    method: 'post',
    data: data
  })
}

licenseService.updateLicense = function (id, data) {
  return fetch({
    url: `/licenses/${id}`,
    method: 'put',
    data
  })
}

licenseService.getMyLicenses = function () {
  return fetch({
    url: '/me/licenses',
    method: 'get'
  })
}

licenseService.getMyLicense = function (id) {
  return fetch({
    url: `/me/licenses/${id}`,
    method: 'get'
  })
}


export default licenseService