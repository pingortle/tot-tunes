const { run } = require('@cycle/run')

const main = require('./lib/main')
const fetchCodes = require('./lib/drivers/fetch-codes')
const playWithSox = require('./lib/drivers/play-with-sox')
const log = require('./lib/drivers/log')

run(main, {
  codes: fetchCodes(process.env.KEYBOARD_DEVICE),
  play: playWithSox(),
  log: log()
})
