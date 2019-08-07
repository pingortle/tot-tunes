/* globals streamToPromise, xs */

const assert = require('assert')
const path = require('path')
const subject = require('../../../lib/drivers/play-with-sox')(process.env.PATH)

module.exports = {
  async playsSongs () {
    const music$ = xs.of(path.join(__dirname, '../../fixtures/silence.mp3'))

    const result = await streamToPromise(subject(music$))

    assert.deepStrictEqual(result, [[0, null]])
  }
}
