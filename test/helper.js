/* global td */

global.td = require('testdouble')
global.xs = require('xstream').default

global.streamToPromise = function streamToPromise (stream) {
  return new Promise((resolve, reject) => {
    const events = []

    stream.setDebugListener({
      next (event) {
        events.push(event)
      },
      error (error) {
        reject(error)
      },
      complete () {
        resolve(events)
      }
    })
  })
}

module.exports = {
  afterEach () {
    td.reset()
  }
}
