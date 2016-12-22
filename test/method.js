'use strict'
const test = require('tape')
var bstamp

test('create stamps', t => {
  bstamp = require('../')
  const gbstamp = global.briskystamp
  t.plan(4)
  stamp('default', gbstamp.cnt + 1, bstamp.create())
  stamp('type', 'click-' + (gbstamp.cnt + 1), bstamp.create('click'))
  stamp('source', 'mac|' + (gbstamp.cnt + 1), bstamp.create(void 0, 'mac'))
  stamp('all', 'mac|click-override', bstamp.create('click', 'mac', 'override'))
  function stamp (label, result, val) {
    t.equal(val, result, label + ' stamp generates "' + result + '"')
  }
})

test('parse src', t => {
  var stamp = bstamp.create('click', 'mac')
  t.equal(bstamp.src(stamp), 'mac', 'extracts src')
  stamp = bstamp.create('click')
  stamp = bstamp.setSrc(stamp, 'iphone')
  t.equal(bstamp.src(stamp), 'iphone', 'extracts src after setSrc')
  t.equal(bstamp.hasSrc(stamp), 6, 'correct hasSrc')
  t.equal(bstamp.src('client|8'), 'client')
  t.equal(bstamp.hasSrc('client|8'), 6)
  t.same(bstamp.parse('client|8'), { val: '8', src: 'client' })
  t.end()
})

test('parse type', t => {
  var stamp = bstamp.create('click', 'mac')
  t.equal(bstamp.type(stamp), 'click', 'extracts type')
  t.end()
})

test('parse stamps - val', t => {
  t.plan(9)
  const stamp = bstamp.create('special-type-of-stamp', 1, 222132123123.001)
  t.equal(bstamp.type(stamp), 'special-type-of-stamp', 'correct type')
  t.equal(bstamp.parse(stamp).type, 'special-type-of-stamp', 'correct type (from parse)')
  t.equal(bstamp.parse(stamp).val, '222132123123.001', 'correct val')
  t.equal(bstamp.val(stamp), '222132123123.001', 'correct val')
  t.equal(bstamp.val(100), 100, 'correct val when not a string')
  t.equal(bstamp.val('hello'), 'hello', 'correct val when a string but no src and no type')
  const stamp2 = bstamp.create(void 0, 1, 222132123123.001)
  t.equal(bstamp.val(stamp2), '222132123123.001', 'correct val when no type')
  const stamp3 = bstamp.create('special-type-of-stamp', void 0, 222132123123.001)
  t.equal(bstamp.val(stamp3), '222132123123.001', 'correct .val when no src')
  t.equal(bstamp.parse(stamp3).val, '222132123123.001', 'correct parse.val when no src')
})

test('parse stamps', t => {
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
    t.deepEqual(bstamp.parse(val), result, '"' + val + '" parsed correctly')
  }
})

test('on complete listeners', t => {
  var cnt = 0
  bstamp.on(() => cnt++)
  bstamp.on(() => cnt++)
  bstamp.close()
  t.equal(cnt, 2, '2 listeners fired')
  t.end()
})

test('remove listeners', t => {
  var cnt = 0
  bstamp.on(() => {})
  bstamp.clear()
  bstamp.close()
  t.equal(cnt, 0, 'removed listener')
  t.end()
})

test('on complete listeners -- on close', t => {
  var cnt = 0
  bstamp.on(() => bstamp.on(() => ++cnt))
  bstamp.close()
  t.equal(cnt, 1, 'listener fired')
  t.end()
})

test('on complete listeners -- on close create a new one', t => {
  var cnt = 0
  bstamp.on(() => {
    bstamp.create()
    cnt++
    bstamp.close()
  })
  bstamp.close()
  t.equal(cnt, 1, 'listener fired')
  t.end()
})

test('on complete listeners -- on close add extra listeners', t => {
  var cnt = 0
  bstamp.on(() => {
    t.equal(bstamp.inProgress, true, 'in progress')
    bstamp.create()
    cnt++
    bstamp.on(() => {
      cnt++
    })
    bstamp.on(() => {
      cnt++
    })
    bstamp.on(() => {
      cnt++
    })
    bstamp.close()
  })
  t.equal(bstamp.inProgress, false, 'not in progress')
  bstamp.close()
  t.equal(bstamp.inProgress, false, 'not in progress')
  bstamp.close()
  t.equal(cnt, 4, 'listener fired')
  t.end()
})
