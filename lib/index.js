'use strict'
const on = exports._on = {}

exports.cnt = 0

exports.create = function (type, source, override) {
  var stamp = (override || ++exports.cnt)
  if (type) {
    stamp = type + '-' + stamp
  }
  if (source) {
    stamp = source + '|' + stamp
  }
  return stamp
}

exports.on = function (stamp, fn) {
  if (!on[stamp]) {
    on[stamp] = []
  }
  on[stamp].push(fn)
}

exports.close = function (stamp) {
  const listeners = on[stamp]
  if (listeners) {
    for (let i = 0, len = listeners.length; i < len; i++) {
      listeners[i]()
    }
    // do perf tests check if its faster to do force hashtable on the start
    delete on[stamp]
  }
}

global.vstamp = exports
