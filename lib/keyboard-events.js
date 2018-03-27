const fs = require('fs')
const { EventEmitter } = require('events')

const KEY_MAP = require('../vendor/node-keylogger/keycodes')
const KEY_ACTION_MAP = {
  '0': 'down',
  '1': 'up'
}

module.exports = KeyboardEvents

function KeyboardEvents(device) {
  this.device = device
  this.emitter = new EventEmitter()
}

Object.assign(KeyboardEvents.prototype, {
  listen
})

function listen() {
  if (this.stream) { throw 'already listening' }

  this.stream = fs.createReadStream(this.device)
  this.stream.on('data', buffer => {
    const events = toEvents(buffer)
    for (let event of events) {
      this.emitter.emit('event', event)
      this.emitter.emit(event.action, event)
    }
  })

  return this.emitter
}

EVENT_STRUCTURE_BYTES = 16
EVENT_STRUCTURES_PER_EVENT = 3
EVENT_CLUSTER_BYTES = EVENT_STRUCTURE_BYTES * EVENT_STRUCTURES_PER_EVENT
KEYBOARD_EVENT_CLUSTER_INDEX = 1
KEYBOARD_EVENT_CLUSTER_POSITION = KEYBOARD_EVENT_CLUSTER_INDEX * EVENT_STRUCTURE_BYTES

function toEvents(buffer) {
  const events = []
  for (let i = 0; i < buffer.length; i += EVENT_CLUSTER_BYTES) {
    const clusterData = buffer.slice(i, i + EVENT_CLUSTER_BYTES)
    const eventData = clusterData.slice(KEYBOARD_EVENT_CLUSTER_POSITION, KEYBOARD_EVENT_CLUSTER_POSITION + EVENT_STRUCTURE_BYTES)
    const event = parseEvent(eventData)
    events.push(event)
  }

  return events
}

function parseEvent(buffer) {
  const time = {
    seconds: buffer.readUInt32LE(0),
    milliseconds: buffer.readUInt32LE(4)
  }
  const raw = {
    time,
    type: buffer.readUInt16LE(8),
    code: buffer.readUInt16LE(10),
    value: buffer.readUInt32LE(12)
  }

  return {
    raw,
    time,
    key: KEY_MAP[raw.code],
    action: KEY_ACTION_MAP[raw.value]
  }
}
