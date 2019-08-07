const { spawn } = require('child_process')
const fromEvent = require('xstream/extra/fromEvent').default

module.exports = function playWithSox (path = process.env.PATH) {
  return function play (audio$) {
    let child = { kill: () => {} }

    const exitCode$ = audio$
      .map(file => {
        child.kill(9)

        const env = { PATH: path }
        child = spawn('play', ['-v', '0.2', file], { stdio: 'ignore', env })

        return fromEvent(child, 'exit').take(1)
      })
      .flatten()

    exitCode$.addListener({})

    return exitCode$
  }
}
