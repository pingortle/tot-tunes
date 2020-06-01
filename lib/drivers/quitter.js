module.exports = function quitter () {
  return function driveQuitter (quit$) {
    quit$.addListener({
      next () {
        process.exit(0)
      }
    })
  }
}
