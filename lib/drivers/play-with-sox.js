const createSpawnDriver = require('./spawn')

module.exports = function playWithSox () {
  const driveSpawn = createSpawnDriver({
    executable: 'play',
    options: { stdio: 'ignore' }
  })

  return function driveSoxPlayer (file$) {
    return driveSpawn(
      file$.map(file => ({
        args: ['-v', '0.5', file]
      }))
    )
  }
}
