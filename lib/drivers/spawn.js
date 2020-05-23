const { spawn } = require('child_process')

module.exports = function createSpawnDriver (defaultCommand = {}) {
  return function driveSpawn (command$) {
    const exitCode$ = command$
      .map(command => ({ ...defaultCommand, ...command }))
      .map(command => spawn(command.executable, command.args, command.options))

    exitCode$.addListener({})

    return exitCode$
  }
}
