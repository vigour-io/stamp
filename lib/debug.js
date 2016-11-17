'use strict'

module.exports = bstamp => {
  const inProgress = bstamp.inProgress = []
  const create = bstamp.create
  const close = bstamp.close

  bstamp.create = (type, src, override, ignore) => {
    const stamp = create(type, src, override)
    if (!ignore) {
      if (inProgress.length > 0) {
        throw new Error(stamp + ' other stamps are still in progress: ' + inProgress)
      }
      inProgress.push(stamp)
    } else {
      console.log('ignore stamp-debug:', stamp)
    }
    return stamp
  }

  bstamp.close = (stamp) => {
    inProgress.splice(inProgress.indexOf(stamp), 1)
    return close(stamp)
  }
}
