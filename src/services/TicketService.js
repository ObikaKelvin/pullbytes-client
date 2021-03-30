import fetch from 'auth/FetchInterceptor'

const ticketService = {}

ticketService.getTickets = function () {
  return fetch({
    url: '/tickets',
    method: 'get'
  })
}

ticketService.getTicket = function (id) {
  return fetch({
    url: `/tickets/${id}`,
    method: 'get'
  })
}

ticketService.createTicket = function (data) {
  return fetch({
    url: '/tickets',
    method: 'post',
    data: data
  })
}

ticketService.updateTicket = function (id, data) {
  return fetch({
    url: `/tickets/${id}`,
    method: 'patch',
    data
  })
}

ticketService.deleteTicket = function (id) {
  return fetch({
    url: `/tickets/${id}`,
    method: 'delete'
  })
}

ticketService.getMyTickets = function () {
  return fetch({
    url: `/me/tickets`,
    method: 'get'
  })
}

ticketService.getMyTicket = function (id) {
  return fetch({
    url: `/me/tickets/${id}`,
    method: 'get'
  })
}


export default ticketService