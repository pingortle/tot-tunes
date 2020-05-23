/* globals streamToPromise, xs */

const assert = require('assert')
const path = require('path')
const subject = require('../../../lib/drivers/play-with-sox')()

module.exports = {
  async playsSongs () {
    const file = path.join(__dirname, '../../fixtures/silence.mp3')
    const music$ = xs.of(file)

    const result = await streamToPromise(subject(music$))

    assert.strictEqual(result.length, 1)
    assert.strictEqual(result[0].spawnfile, 'play')
    assert.strictEqual(result[0].spawnargs[3], file)
  }
}
