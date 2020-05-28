const os = require('os')
const scanDevicesOnLinux = require('./scan-devices-on-linux')

module.exports = function findDevice ({ override }) {
  if (override) return override

  switch (os.type()) {
    case 'Linux':
      return scanDevicesOnLinux()
    case 'Darwin':
      throw new Error('Must supply override on MacOS')
    default:
      throw new Error(`Unsupported platform: ${os.type()}`)
  }
}
