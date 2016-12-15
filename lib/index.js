if (!global.briskystamp) {
  const bstamp = global.briskystamp = {}
  var on

  bstamp.cnt = 0
  // add timestamp option -- maybe allways use it

  bstamp.create = (type, src, override) => {
    var stamp = override || ++bstamp.cnt
    if (type) {
      stamp = type + '-' + stamp
    }
    if (src) {
      stamp = src + '|' + stamp
    }
    return stamp
  }

  bstamp.on = fn => {
    if (!on) {
      on = [ fn ]
    } else {
      on.push(fn)
    }
  }

  bstamp.close = () => {
    if (on) {
      for (let i = 0; i < on.length; i++) {
        on[i]()
      }
      on = false
    }
  }

  bstamp.clear = () => { on = false }

  bstamp.parse = stamp => {
    const parsed = {}
    const src = bstamp.src(stamp)
    const type = bstamp.type(stamp)
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

  bstamp.src = stamp => {
    if (typeof stamp === 'string') {
      for (let i = 1, len = stamp.length - 2; i < len; i++) {
        if (stamp.charAt(i) === '|') {
          return stamp.slice(0, i)
        }
      }
    }
  }

  bstamp.val = stamp => {
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

  bstamp.hasSrc = stamp => {
    if (typeof stamp === 'string') {
      for (let i = 1, len = stamp.length - 2; i < len; i++) {
        if (stamp.charAt(i) === '|') {
          return i
        }
      }
    }
  }

  bstamp.setSrc = (stamp, val) => val + '|' + stamp

  bstamp.type = (stamp, src) => {
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
}

export default global.briskystamp
