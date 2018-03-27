const Rx = require('rxjs/Rx')

const KeyboardEvents = require('./lib/keyboard-events')

run(process.env.KEYBOARD_DEVICE)

function run(device) {
  console.log(`listening on ${device}`)
  const keyboard = new KeyboardEvents(device).listen()

  keyboard.on('error', console.error)

  const downEvents = Rx.Observable.fromEvent(keyboard, 'down')
  const enterEvents = downEvents.filter(event => event.key === 'KEY_ENTER')
  const lines = downEvents.filter(event => event.key !== 'KEY_ENTER')
    .buffer(enterEvents)

  lines.map(line => line.map(event => event.key.split('_')[1]).join(''))
    .forEach(console.log)
}
