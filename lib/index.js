'use strict'
const on = exports._on = {}
const done = exports._done = {}
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
  if (!on[stamp]) { on[stamp] = [] }
  on[stamp].push(fn)
}

exports.done = function (stamp, fn) {
  if (!done[stamp]) { done[stamp] = [] }
  done[stamp].push(fn)
}

exports.close = function (stamp) {
  const listeners = on[stamp]
  const doneListeners = done[stamp]
  if (listeners) {
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]()
    }
    delete on[stamp]
  }
  if (doneListeners) {
    for (let i = 0; i < doneListeners.length; i++) {
      doneListeners[i]()
    }
    delete done[stamp]
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
      parsed.val = stamp.slice(stamp.indexOf(type) + type.length + 1)
    }
  } else {
    parsed.val = stamp
  }
  return parsed
}

exports.src = function (stamp) {
  if (typeof stamp === 'string') {
    for (let i = 1, len = stamp.length - 2; i < len; i++) {
      if (stamp.charAt(i) === '|') {
        return stamp.slice(0, i)
      }
    }
  }
}

exports.val = function (stamp) {
  if (typeof stamp === 'string') {
    for (let i = stamp.length - 1; i > 0; i--) {
      if (stamp.charAt(i) === '-') {
        return stamp.slice(i + 1)
      }
    }
    for (let i = 1, len = stamp.length - 2; i < len; i++) {
      if (stamp.charAt(i) === '|') {
        return stamp.slice(i + 1)
      }
    }
    return stamp
  } else {
    return stamp
  }
}

exports.hasSrc = function (stamp) {
  if (typeof stamp === 'string') {
    for (let i = 1, len = stamp.length - 2; i < len; i++) {
      if (stamp.charAt(i) === '|') {
        return i
      }
    }
  }
}

exports.setSrc = function (stamp, val) {
  return val + '|' + stamp
}

exports.type = function (stamp, src) {
  if (typeof stamp === 'string') {
    let index
    if (!src) {
      src = -1
      for (let j = 1; j < stamp.length - 2; j++) {
        if (stamp.charAt(j) === '|') {
          src = j
          break
        }
      }
    }
    for (let i = stamp.length - 2; i > src + 1; i--) {
      let char = stamp.charAt(i)
      if (char === '-') {
        index = i
        break
      }
    }
    if (index) {
      return stamp.slice(src + 1, index)
    }
  }
}
