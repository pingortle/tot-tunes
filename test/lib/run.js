module.exports = (deps) => {
  const subject = deps['./lib/run']
  subject('sample-data.bin', `${process.cwd()}/tunes`,  `${process.cwd()}/bin`)
}
