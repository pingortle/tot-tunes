const fs = require('fs')
const path = require('path')

const DEVICE_PATH = '/dev/input/by-id'

module.exports = function scanDevicesOnLinux () {
  const devices = fs.readdirSync(DEVICE_PATH)
  const usbReader = devices.find(
    device => /^usb-/.test(device) && /reader/i.test(device)
  )

  return path.join(DEVICE_PATH, usbReader)
}
