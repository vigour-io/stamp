'use strict'

module.exports = (vstamp) => {
  const inProgress = {}
  const create = vstamp.create
  const close = vstamp.close

  vstamp.create = (type, src, override, ignore) => {
    const stamp = create(type, src, override)
    if (!ignore) {
      if (Object.keys(inProgress).length > 0) {
        throw new Error(stamp + ' other stamps are still in progress: ' + Object.keys(inProgress))
      }
      inProgress[stamp] = true
    }
    return stamp
  }

  vstamp.close = (stamp) => {
    delete inProgress[stamp]
    return close(stamp)
  }
}
