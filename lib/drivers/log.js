module.exports = function log () {
  return message$ =>
    message$.addListener({
      next (message) {
        console.log(message)
      },
      error (error) {
        console.log(error)
      }
    })
}
