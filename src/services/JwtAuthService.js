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
      'public-request': 'true'
    },
		data: data
	})
}

export default JwtAuthService