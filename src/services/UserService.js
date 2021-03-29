import fetch from 'auth/FetchInterceptor'

const userService = {}

userService.getUsers = function () {
  return fetch({
    url: '/users',
    method: 'get'
  })
}

userService.createUser = function (user) {
  return fetch({
    url: '/users_file',
    method: 'post',
    data: user
  })
}

userService.getUser = function (id) {
  return fetch({
    url: `/users/${id}`,
    method: 'get'
  })
}

userService.getUser = function (id) {
  return fetch({
    url: `/users/${id}`,
    method: 'get'
  })
}

userService.me = function () {
  return fetch({
    url: `/me`,
    method: 'post'
  })
}

userService.updateUser = function (id, data) {
  return fetch({
    url: `/users/${id}`,
    method: 'patch',
    data
  })
}

userService.updateMe = function (data) {
  return fetch({
    url: `/me/update_me`,
    method: 'patch',
    data
  })
}

userService.updatePassword = function (data) {
  return fetch({
    url: `/me/update_password`,
    method: 'patch',
    data
  })
}

userService.deleteUser = function (id) {
  return fetch({
    url: `/users/${id}`,
    method: 'delete'
  })
}

userService.deleteMe = function () {
  return fetch({
    url: `/delete_me`,
    method: 'delete',
  })
}


export default userService