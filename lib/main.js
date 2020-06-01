const fromEvent = require('xstream/extra/fromEvent').default
const split = require('xstream/extra/split').default
const xs = require('xstream').default

module.exports = function main (sources) {
  const tunesPath = process.env.TUNES_DIRECTORY || `${process.cwd()}/tunes`
  const file$ = sources.codes.map(code => `${tunesPath}/${code}.mp3`)
  const playable$ = file$
    .compose(split(sources.play.startWith(true)))
    .map(candidate$ => candidate$.take(1))
    .flatten()

  const startMessage$ = playable$.map(filename => `playing ${filename}`)
  const endMessage$ = xs
    .combine(
      sources.play.map(player => fromEvent(player, 'exit')).flatten(),
      playable$
    )
    .map(
      ([[exitCode, ..._], filename]) =>
        `completed playing ${filename}  with exit code ${exitCode}`
    )

  return { play: playable$, log: xs.merge(startMessage$, endMessage$) }
}