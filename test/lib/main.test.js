/* globals streamToPromise, xs */

const assert = require('assert')
const main = require('../../lib/main')

module.exports = {
  async passFilePathsToPlay () {
    const sources = {
      codes: xs.of('123', '456'),
      play: xs.periodic(50)
    }

    const result = main(sources)

    assert.deepStrictEqual(await streamToPromise(result.play), [
      `${process.cwd()}/tunes/123.mp3`
    ])
  }
}
