if (!global.briskystamp) {
  'use strict'
  var exports = {}
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
      setTimeout(() => { tsInProgress = false })
    } else {
      d += ++cnt / 9999
    }
    return d
  }

  exports.create = override => override || ms()

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
    return stamp > 1e6 ? (stamp + ts) : stamp
  }
}

export default global.briskystamp
