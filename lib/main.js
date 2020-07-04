const fromEvent = require('xstream/extra/fromEvent').default
const dropRepeats = require('xstream/extra/dropRepeats').default
const xs = require('xstream').default

module.exports = function main (sources) {
  const tunesPath = process.env.TUNES_DIRECTORY || `${process.cwd()}/tunes`

  const file$ = sources.codes.stream
    .compose(dropRepeats())
    .map(code => `${tunesPath}/${code}.mp3`)

  const startMessage$ = file$.map(filename => `playing ${filename}`)
  const endMessage$ = xs
    .combine(
      sources.play.map(player => fromEvent(player, 'exit').take(1)).flatten(),
      file$
    )
    .map(
      ([[exitCode, ..._], filename]) =>
        `completed playing ${filename}  with exit code ${exitCode}`
    )

  return {
    log: xs.merge(startMessage$, endMessage$),
    play: file$.endWhen(sources.codes.complete),
    server: sources.codes.stream,
    quit: sources.codes.complete
  }
}
