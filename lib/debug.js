'use strict'

module.exports = (vstamp) => {
  const inProgress = {}
  const create = vstamp.create
  const close = vstamp.close

  vstamp.create = (type, src, override) => {
    const stamp = create(type, src, override)
    if (Object.keys(inProgress).length > 0) {
      throw new Error('other stamps are still in progress: ' + Object.keys(inProgress))
    }
    inProgress[stamp] = true
    return stamp
  }

  vstamp.close = (stamp) => {
    delete inProgress[stamp]
    return close(stamp)
  }
}
