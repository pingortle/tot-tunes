const assert = require('assert')
const run = require('../../lib/run')

module.exports = function works () {
  assert.doesNotThrow(() => run('sample-data.bin', `${process.cwd()}/tunes`, `${process.cwd()}/bin`))
}
