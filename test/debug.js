'use strict'
const test = require('tape')
test('debug', function (t) {
  const bstamp = require('../')
  require('../debug')(bstamp)
  const stamp1 = bstamp.create()
  bstamp.close(stamp1)
  const stamp = bstamp.create()
  try {
    bstamp.create()
  } catch (e) {
    t.same(e.message, (stamp + 1) + ' other stamps are still in progress: ' + stamp, 'throws inProgress error')
  }
  bstamp.create(false, false, false, true)
  t.ok(true, 'ignore option works')
  t.same(bstamp.inProgress, [ stamp ], 'correct bstamp.inProgress')
  t.end()
})
