'use strict'
const on = exports._on = {}

exports.cnt = 0

exports.create = function (type, src, override) {
  var stamp = override || ++exports.cnt
  if (type) {
    stamp = type + '-' + stamp
  }
  if (src) {
    stamp = src + '|' + stamp
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
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]()
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
  const src = exports.src(stamp)
  const type = exports.type(stamp)
  if (src || type) {
    if (src) {
      parsed.src = src
      if (type) {
        parsed.type = type
        parsed.val = stamp.slice(stamp.indexOf(type) + type.length + 1)
      } else {
        parsed.val = stamp.slice(stamp.indexOf('|') + 1)
      }
    } else {
      parsed.type = type
      parsed.val = stamp.slice(stamp.indexOf('-') + 1)
    }
  } else {
    parsed.val = stamp
  }
  return parsed
}

exports.src = function (stamp) {
  if (typeof stamp === 'string') {
    for (let i = 1, len = stamp.length - 1; i < len; i++) {
      if (stamp.charAt(i) === '|') {
        return stamp.slice(0, i)
      }
    }
  }
}

exports.hasSrc = function (stamp) {
  if (typeof stamp === 'string') {
    for (let i = 1, len = stamp.length - 1; i < len; i++) {
      if (stamp.charAt(i) === '|') {
        return i
      }
    }
  }
}

exports.setSrc = function (stamp, val) {
  return val + '|' + stamp
}

exports.type = function (stamp) {
  if (typeof stamp === 'string') {
    let index
    let src
    for (let i = 1, len = stamp.length - 1; i < len; i++) {
      let char = stamp.charAt(i)
      if (char === '-') {
        index = i
        if (src) {
          return stamp.slice(src + 1, index)
        }
      } else if (!src && char === '|') {
        src = i
      }
    }
    if (index && !src) {
      return stamp.slice(0, index)
    }
  }
}
