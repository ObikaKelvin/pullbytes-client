import fetch from 'auth/FetchInterceptor'

const notificationService = {}

notificationService.getNotifications = function () {
  return fetch({
    url: '/notifications',
    method: 'get'
  })
}

notificationService.getNotification = function (id) {
  return fetch({
    url: `/notifications/${id}`,
    method: 'get'
  })
}

notificationService.createNotification = function (data) {
  return fetch({
    url: '/notifications',
    method: 'post',
    data: data
  })
}

notificationService.updateNotification = function (id, data) {
  return fetch({
    url: `/notifications/${id}`,
    method: 'put',
    data
  })
}

notificationService.deleteNotification = function (id) {
  return fetch({
    url: `/notifications/${id}`,
    method: 'delete'
  })
}

export default notificationService