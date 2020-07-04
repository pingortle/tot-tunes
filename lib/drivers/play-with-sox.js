const createSpawnDriver = require('./spawn')

module.exports = function playWithSox () {
  const driveSpawn = createSpawnDriver({
    executable: 'play',
    options: { stdio: 'ignore' }
  })

  let playing = {}

  return function driveSoxPlayer (file$) {
    return driveSpawn(
      file$.map(file => ({
        args: ['-v', '1', file]
      }))
    ).map(process => {
      const old = playing
      if (old.pid && old.exitCode == null) {
        console.log(
          `Killing [${old.pid}] ${old.spawnargs.join(' ')}`
        )
        setImmediate(() => old.kill('SIGTERM'))
      }

      return (playing = process)
    })
  }
}
