'use strict'
const vstamp = require('../')
const test = require('tape')

test('create stamps', function (t) {
  t.plan(4)
  stamp('default', vstamp.cnt + 1, vstamp.create())
  stamp('type', 'click-' + (vstamp.cnt + 1), vstamp.create('click'))
  stamp('source', 'mac|' + (vstamp.cnt + 1), vstamp.create(void 0, 'mac'))
  stamp('all', 'mac|click-override', vstamp.create('click', 'mac', 'override'))
  function stamp (label, result, val) {
    t.equal(val, result, label + ' stamp generates "' + result + '"')
  }
})

test('parse src', function (t) {
  var stamp = vstamp.create('click', 'mac')
  t.equal(vstamp.src(stamp), 'mac', 'extracts src')
  stamp = vstamp.create('click')
  stamp = vstamp.setSrc(stamp, 'iphone')
  t.equal(vstamp.src(stamp), 'iphone', 'extracts src after setSrc')
  t.equal(vstamp.hasSrc(stamp), 6, 'correct hasSrc')
  t.end()
})

test('parse type', function (t) {
  var stamp = vstamp.create('click', 'mac')
  t.equal(vstamp.type(stamp), 'click', 'extracts type')
  t.end()
})

test('parse stamps - val', function (t) {
  t.plan(9)
  const stamp = vstamp.create('special-type-of-stamp', 1, 222132123123.001)
  t.equal(vstamp.type(stamp), 'special-type-of-stamp', 'correct type')
  t.equal(vstamp.parse(stamp).type, 'special-type-of-stamp', 'correct type (from parse)')
  t.equal(vstamp.parse(stamp).val, '222132123123.001', 'correct val')
  t.equal(vstamp.val(stamp), '222132123123.001', 'correct val')
  t.equal(vstamp.val(100), 100, 'correct val when not a string')
  t.equal(vstamp.val('hello'), 'hello', 'correct val when a string but no src and no type')
  const stamp2 = vstamp.create(void 0, 1, 222132123123.001)
  t.equal(vstamp.val(stamp2), '222132123123.001', 'correct val when no type')
  const stamp3 = vstamp.create('special-type-of-stamp', void 0, 222132123123.001)
  t.equal(vstamp.val(stamp3), '222132123123.001', 'correct .val when no src')
  t.equal(vstamp.parse(stamp3).val, '222132123123.001', 'correct parse.val when no src')
})

test('parse stamps', function (t) {
  t.plan(6)
  parse('source|type-val', { src: 'source', type: 'type', val: 'val' })
  parse('source|val', { src: 'source', val: 'val' })
  parse(
    'source-source|type|type-val-val|val',
    { src: 'source-source', val: 'val|val', type: 'type|type-val' }
  )
  parse('source-source|val', { src: 'source-source', val: 'val' })
  parse('val', { val: 'val' })
  parse('type-val', { type: 'type', val: 'val' })
  function parse (val, result) {
    t.deepEqual(vstamp.parse(val), result, '"' + val + '" parsed correctly')
  }
})

test('on complete listeners', function (t) {
  t.plan(2)
  var stamp = vstamp.create()
  var cnt = 0
  vstamp.on(stamp, () => cnt++)
  vstamp.on(stamp, () => cnt++)
  vstamp.close(stamp)
  t.equal(cnt, 2, '2 listeners fired')
  t.equal(Object.keys(vstamp._on).length, 0, 'removed listeners')
})

test('on- done listeners', function (t) {
  t.plan(3)
  var stamp = vstamp.create()
  var onFired
  vstamp.done(stamp, () => t.ok(onFired, 'fired "done" after on'))
  vstamp.on(stamp, () => {
    onFired = true
    t.ok(true, 'fired "on" first')
  })
  vstamp.close(stamp)
  t.equal(Object.keys(vstamp._done).length, 0, 'removed listeners')
})

test('remove listeners', function (t) {
  t.plan(1)
  var stamp = vstamp.create()
  vstamp.on(stamp, () => {})
  vstamp.remove(stamp)
  t.equal(Object.keys(vstamp._on).length, 0, 'removed listeners')
})

test('on complete listeners -- on close', function (t) {
  t.plan(2)
  var stamp = vstamp.create()
  var cnt = 0
  vstamp.on(stamp, () => vstamp.on(stamp, () => ++cnt))
  vstamp.close(stamp)
  t.equal(cnt, 1, 'listener fired')
  t.equal(Object.keys(vstamp._on).length, 0, 'removed listeners')
})
