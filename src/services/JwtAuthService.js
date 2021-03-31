import fetch from 'auth/FetchInterceptor'

const JwtAuthService = {}

JwtAuthService.login = function (data) {
	return fetch({
		url: '/login',
		method: 'post',
		headers: {
      'public-request': 'false'
    },
		data: data
	})
}

JwtAuthService.signUp = function (data) {
	return fetch({
		url: '/register',
		method: 'post',
		headers: {
      'public-request': 'false'
    },
		data: data
	})
}

JwtAuthService.signOut = function (data) {
	return fetch({
		url: '/logout',
		method: 'post',
		headers: {
      'public-request': 'false'
    },
	})
}

export default JwtAuthService