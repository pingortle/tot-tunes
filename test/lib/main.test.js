const assert = require('assert')
const main = require('../../lib/main')

module.exports = {
  passFilePathsToPlay () {
    const sources = {
      codes: ['123', '456']
    }
    const result = main(sources)
    assert.deepStrictEqual(result.play, [
      `${process.cwd()}/tunes/123.mp3`,
      `${process.cwd()}/tunes/456.mp3`
    ])
  }
}
