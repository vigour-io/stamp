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

test('parse stamps', function (t) {
  t.plan(6)
  parse('source|type-val', { source: 'source', type: 'type', val: 'val' })
  parse('source|val', { source: 'source', val: 'val' })
  parse(
    'source-source|type|type-val-val|val',
    { source: 'source-source', type: 'type|type', val: 'val-val|val' }
  )
  parse('source-source|val', { source: 'source-source', val: 'val' })
  parse('val', { val: 'val' })
  parse('type-val', { val: 'val', type: 'type' })
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

test('remove listeners', function (t) {
  t.plan(1)
  var stamp = vstamp.create()
  vstamp.on(stamp, () => {})
  vstamp.remove(stamp)
  t.equal(Object.keys(vstamp._on).length, 0, 'removed listeners')
})
