/* globals streamToPromise, xs */

const assert = require('assert')
const delay = require('xstream/extra/delay').default
const main = require('../../lib/main')

module.exports = {
  async passFilePathsToPlay () {
    const stream = xs.of('123', '456')
    const sources = {
      codes: {
        stream,
        complete: stream.compose(delay(1))
      },
      play: xs.periodic(10)
    }

    const result = main(sources)

    assert.deepStrictEqual(await streamToPromise(result.play), [
      `${process.cwd()}/tunes/123.mp3`
    ])
  }
}
