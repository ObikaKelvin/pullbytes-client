import fetch from 'auth/FetchInterceptor'

const JwtAuthService = {}

JwtAuthService.login = function (data) {
	return fetch({
		url: '/login',
		method: 'post',
		mode: 'cors',
		headers: {
			'public-request': 'false',
			"Access-Control-Allow-Origin":"*",
			'Access-Control-Allow-Methods': '*',
			'Access-Control-Allow-Credentials': true,
			'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,X-Token-Auth,Authorization',
			'Accept': 'application/json'
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