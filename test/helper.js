/* global td */

global.td = require('testdouble')
global.xs = require('xstream').default

const STREAM_LISTENER_METHODS = {
  active: 'addListener',
  passive: 'setDebugListener'
}

global.streamToPromise = function streamToPromise (stream, method = 'active') {
  return new Promise((resolve, reject) => {
    const events = []

    stream[STREAM_LISTENER_METHODS[method]]({
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
