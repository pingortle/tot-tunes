const { spawn } = require('child_process')

const Rx = require('rxjs/Rx')

const KeyboardEvents = require('./lib/keyboard-events')


run(process.env.KEYBOARD_DEVICE, process.env.TUNES_DIRECTORY)

async function run(device, tunesDirectory = `${process.cwd()}/tunes`) {
  console.log(`listening on ${device}`)
  const keyboard = new KeyboardEvents(device).listen()

  keyboard.on('error', console.error)

  const downEvents = Rx.Observable.fromEvent(keyboard, 'down')
  const enterEvents = downEvents.filter(event => event.key === 'KEY_ENTER')
  const lines = downEvents.filter(event => event.key !== 'KEY_ENTER')
    .buffer(enterEvents)

  let child = { kill: () => {} }

  lines.forEach(events => {
      child.kill(9)
      const code = events.map(event => event.key.split('_')[1]).join('')
      console.log(`received code: "${code}"`)
      mp3 = `${tunesDirectory}/${code}.mp3`
      child = spawn('play', ['-v', '0.1', mp3])
      console.log(`playing "${mp3}"...`)
      child.on('error', console.error)
    }).catch(console.error)
}
