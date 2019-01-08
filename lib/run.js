const { spawn } = require('child_process')
const streamFromEvent = require('xstream/extra/fromEvent').default
const buffer = require('xstream/extra/buffer').default

const KeyboardEvents = require('./keyboard-events')

module.exports = async function run (device, tunesDirectory = `${process.cwd()}/tunes`, path = process.env.PATH) {
  const keyboard = new KeyboardEvents(device).listen()

  console.log(`listening on ${device}`)

  const downEvents = streamFromEvent(keyboard, 'down')
  const enterEvents = downEvents.filter(event => event.key === 'KEY_ENTER')
  const lines = downEvents.filter(event => event.key !== 'KEY_ENTER')
    .compose(buffer(enterEvents))

  let child = { kill: () => {} }

  lines.addListener({
    next (events) {
      const code = events.map(event => event.key.split('_')[1]).join('')
      const mp3 = `${tunesDirectory}/${code}.mp3`

      child.kill(9)

      console.log(`received code: "${code}"`)

      const env = { PATH: path }
      child = spawn('play', ['-v', '0.2', mp3], { stdio: 'ignore', env })

      console.log(`playing "${mp3}"...`)

      child.on('error', console.error)
      child.on('exit', (code, signal) =>
        console.log(`stopped playing "${mp3}"... code: ${code}, signal: ${signal}`)
      )
    },
    error: console.error
  })
}
