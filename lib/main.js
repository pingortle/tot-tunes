const xs = require('xstream').default

module.exports = function main (sources) {
  const file$ = sources.codes.map(code => `${process.cwd()}/tunes/${code}.mp3`)
  const startMessage$ = file$.map(filename => `playing ${filename}`)
  const endMessage$ = xs
    .combine(file$, sources.play)
    .map(
      ([filename, [exitCode, ..._]]) =>
        `completed playing ${filename}  with exit code ${exitCode}`
    )

  return { play: file$, log: xs.merge(startMessage$, endMessage$) }
}
