if (!global.briskystamp) {
  const next = typeof setImmediate === void 0 ? setTimeout : setImmediate
  const ts = exports.ts = 535673248076
  var tsInProgress = false
  var cnt = 0
  var d
  var on

  global.briskystamp = exports
  exports.inProgress = false
  exports.offset = 0

  const ms = () => {
    if (!tsInProgress) {
      cnt = 0
      d = Date.now() - ts + exports.offset
      tsInProgress = true
      next(() => { tsInProgress = false })
    } else {
      d += ++cnt / 9999
    }
    return d
  }

  exports.create = (type, src, override) => {
    if (type) {
      return [ override || ms(), src || 0, parseInt(type, 36) ]
    } else if (src) {
      return [ override || ms(), src ]
    } else {
      return [ override || ms() ]
    }
  }

  exports.src = stamp => stamp && stamp[1]

  exports.val = stamp => stamp && (stamp[0] || stamp)

  exports.type = stamp => stamp && stamp[2] && stamp[2].toString(36)

  exports.on = fn => {
    if (!on) {
      on = [ fn ]
    } else {
      on.push(fn)
    }
  }

  exports.clear = () => { on = false } // rename this to stop

  exports.close = () => {
    if (on && !exports.inProgress) {
      exports.inProgress = true
      for (let i = 0; i < on.length; i++) { on[i]() }
      exports.inProgress = on = false
    }
  }

  exports.parse = stamp => {
    if (typeof stamp === 'object') {
      const parsed = { val: stamp[0] }
      const src = stamp[1]
      const type = exports.type(stamp)
      if (src) parsed.src = src
      if (type) parsed.type = type
      return parsed
    } else {
      return { val: stamp }
    }
  }
}

export default global.briskystamp
