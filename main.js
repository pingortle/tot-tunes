const { spawn } = require('child_process')

const Rx = require('rxjs/Rx')

const KeyboardEvents = require('./lib/keyboard-events')

run(process.env.KEYBOARD_DEVICE)

async function run(device) {
  console.log(`listening on ${device}`)
  const keyboard = new KeyboardEvents(device).listen()

  keyboard.on('error', console.error)

  const downEvents = Rx.Observable.fromEvent(keyboard, 'down')
  const enterEvents = downEvents.filter(event => event.key === 'KEY_ENTER')
  const lines = downEvents.filter(event => event.key !== 'KEY_ENTER')
    .buffer(enterEvents)

  let child = { kill: () => {} }

  await lines.forEach(events => {
      child.kill(9)
      const code = events.map(event => event.key.split('_')[1]).join('')
      child = spawn('play', ['-v', '0.2', `${process.cwd()}/tunes/${code}.mp3`])
      child.on('error', console.error)
    })
}
