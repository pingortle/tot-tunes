const { spawn } = require('child_process')
const Rx = require('rxjs/Rx')
const KeyboardEvents = require('./keyboard-events')

module.exports = async function run(device, tunesDirectory = `${process.cwd()}/tunes`) {
  const keyboard = new KeyboardEvents(device).listen()
  keyboard.on('error', console.error)

  console.log(`listening on ${device}`)

  const downEvents = Rx.Observable.fromEvent(keyboard, 'down')
  const enterEvents = downEvents.filter(event => event.key === 'KEY_ENTER')
  const lines = downEvents.filter(event => event.key !== 'KEY_ENTER')
    .buffer(enterEvents)

  let child = { kill: () => {} }

  lines.forEach(events => {
      const code = events.map(event => event.key.split('_')[1]).join('')
      const mp3 = `${tunesDirectory}/${code}.mp3`

      child.kill(9)

      console.log(`received code: "${code}"`)

      child = spawn('play', ['-v', '0.2', mp3], { stdio: 'ignore' })

      console.log(`playing "${mp3}"...`)

      child.on('error', console.error)
      child.on('exit', (code, signal) =>
        console.log(`stopped playing "${mp3}"... code: ${code}, signal: ${signal}`)
      )
    })
    .catch(console.error)
}
