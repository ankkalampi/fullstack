const requestLogger = (request, response, next) => {
  console.log(request.method, request.path)

  next()
}

module.exports = {
  requestLogger
}