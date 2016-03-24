'use strict'
const on = exports._on = {}
const sourceRegEx = /\|/
const typeRegEx = /\-/

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

exports.close = function (stamp, args) {
  const listeners = on[stamp]
  if (listeners) {
    if (args) {
      for (let i = 0, len = listeners.length; i < len; i++) {
        listeners[i].apply(null, args)
      }
    } else {
      for (let i = 0, len = listeners.length; i < len; i++) {
        listeners[i]()
      }
    }
    // @todo: do perf tests check if its faster to do force hashtable on the start
    delete on[stamp]
  }
}

exports.remove = function (stamp) {
  if (on[stamp]) { delete on[stamp] }
}

exports.parse = function (stamp) {
  const parsed = {}
  if (sourceRegEx.test(stamp)) {
    let split = stamp.split('|')
    parsed.source = split.shift()
    stamp = split.join('|')
  }
  if (typeRegEx.test(stamp)) {
    let split = stamp.split('-')
    parsed.type = split.shift()
    stamp = split.join('-')
  }
  parsed.val = stamp
  return parsed
}
