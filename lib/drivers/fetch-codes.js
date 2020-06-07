const buffer = require('xstream/extra/buffer').default
const streamFromEvent = require('xstream/extra/fromEvent').default
const xs = require('xstream').default
const KeyboardEvents = require('../keyboard-events')

module.exports = function fetchCodes (device) {
  return function codes () {
    const keyboard = new KeyboardEvents(device).listen()

    const down$ = streamFromEvent(keyboard, 'down')
    const newline$ = down$.filter(event => event.key === 'KEY_ENTER')
    const line$ = down$.filter(event => event.key !== 'KEY_ENTER')
      .compose(buffer(newline$))
      .map(events => events.map(event => event.key.split('_')[1]).join(''))

    return { stream: line$, complete: xs.never() }
  }
}
