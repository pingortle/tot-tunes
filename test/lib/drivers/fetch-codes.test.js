/* global streamToPromise */

const assert = require('assert')
const fetchCodes = require('../../../lib/drivers/fetch-codes')

module.exports = {
  async collectsCodesFromKeyboardEvents () {
    const subject = fetchCodes('sample-data.bin')
    const result$ = subject().take(1)

    result$.addListener({})

    const result = await streamToPromise(result$)

    assert.deepStrictEqual(result, ['21804289'])
  }
}
