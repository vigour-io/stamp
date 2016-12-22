'use strict'
const previous = global.__bstamp__
// this should go makes it too large its debug code
exports.resolve = function (previous, current) {
  console.log('stamp mismatch choosing highest compatible version', previous.version, 'vs', current.version)
  if (previous.version && current.version) {
    const pv = previous.version.split('.')
    const cv = current.version.split('.')
    if (pv[0] !== cv[0]) {
      throw new Error('incompatible major stamp versions ' + previous.version + ' vs ' + current.version)
    } else {
      if (previous.version === current.version) {
        return apply(previous, current)
      } else {
        if (cv[1] > pv[1]) {
          return apply(previous, current)
        } else if (cv[1] < pv[1]) {
          return apply(current, previous)
        } else if (cv[2] > pv[2]) {
          return apply(previous, current)
        } else {
          return apply(current, previous)
        }
      }
    }
  } else {
    if (previous.version && !current.version) {
      return apply(current, previous)
    } else {
      return apply(previous, current)
    }
  }
  function apply (target, current) {
    for (var i in current) {
      target[i] = current[i]
    }
    return current
  }
}

if (previous) {
  exports.resolve(previous, exports)
}
