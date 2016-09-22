'use strict'
const test = require('tape')
test('debug', function (t) {
  const vstamp = require('../')
  vstamp.debug()
  const stamp = vstamp.create()
  try {
    vstamp.create()
  } catch (e) {
    t.same(e.message, 'other stamps are still in progress: ' + stamp, 'throws inProgress error')
    t.end()
  }
})
