'use strict'
const test = require('tape')
test('debug', function (t) {
  const vstamp = require('../')
  require('../debug')(vstamp)
  const stamp1 = vstamp.create()
  vstamp.close(stamp1)
  const stamp = vstamp.create()
  try {
    vstamp.create()
  } catch (e) {
    t.same(e.message, (stamp + 1) + ' other stamps are still in progress: ' + stamp, 'throws inProgress error')
  }
  vstamp.create(false, false, false, true)
  t.ok(true, 'ignore option works')
  t.same(vstamp.inProgress, [ stamp ], 'correct vstamp.inProgress')
  t.end()
})
