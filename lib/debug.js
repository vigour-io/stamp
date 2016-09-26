'use strict'

module.exports = (vstamp) => {
  const inProgress = vstamp.inProgress = []
  const create = vstamp.create
  const close = vstamp.close

  vstamp.create = (type, src, override, ignore) => {
    const stamp = create(type, src, override)
    if (!ignore) {
      if (inProgress.length > 0) {
        throw new Error(stamp + ' other stamps are still in progress: ' + inProgress)
      }
      inProgress.push(stamp)
    }
    return stamp
  }

  vstamp.close = (stamp) => {
    inProgress.splice(inProgress.indexOf(stamp), 1)
    return close(stamp)
  }
}
