if (!global.briskystamp) {
  const bs = {}
  const ts = bs.ts = 535673248076
  var tsInProgress = false
  var cnt = 0
  var d
  var on

  global.briskystamp = bs

  bs.inProgress = false
  bs.offset = 0

  const ms = () => {
    if (!tsInProgress) {
      cnt = 0
      d = Date.now() - ts + bs.offset
      tsInProgress = true
      setTimeout(() => { tsInProgress = false })
    } else {
      d += ++cnt / 9999
    }
    return d
  }

  bs.create = override => override || ms()

  bs.on = fn => {
    if (!on) {
      on = [ fn ]
    } else {
      on.push(fn)
    }
  }

  bs.clear = () => { on = false } // rename this to stop

  bs.close = () => {
    if (on && !bs.inProgress) {
      bs.inProgress = true
      for (let i = 0; i < on.length; i++) { on[i]() }
      bs.inProgress = on = false
    }
  }

  bs.parse = stamp => stamp > 1e6 ? (stamp + ts) : stamp
}

export default global.briskystamp
