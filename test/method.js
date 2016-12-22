const test = require('tape')
var bstamp = require('../')

test('parse src', t => {
  var stamp = bstamp.create('click', 'mac')
  t.equal(bstamp.src(stamp), 'mac', 'extracts src')
  stamp = bstamp.create('click')
  t.equal(bstamp.src(bstamp.create(false, 'client')), 'client')
  t.same(bstamp.parse(bstamp.create(false, 'client', 8)), { val: 8, src: 'client' })
  t.end()
})

test('parse type', t => {
  var stamp = bstamp.create('click', 'mac')
  t.equal(bstamp.type(stamp), 'click', 'extracts type')
  t.end()
})

test('parse stamps - val', t => {
  t.plan(9)
  const stamp = bstamp.create('special', 1, 222132123123.001)
  t.equal(bstamp.type(stamp), 'special', 'correct type')
  t.equal(bstamp.parse(stamp).type, 'special', 'correct type (from parse)')
  t.equal(bstamp.parse(stamp).val, 222132123123.001, 'correct val')
  t.equal(bstamp.val(stamp), 222132123123.001, 'correct val')
  t.equal(bstamp.val(100), 100, 'correct val when not a string')
  t.equal(bstamp.val(222), 222, 'correct val when a string but no src and no type')
  const stamp2 = bstamp.create(void 0, 1, 222132123123.001)
  t.equal(bstamp.val(stamp2), 222132123123.001, 'correct val when no type')
  const stamp3 = bstamp.create('special-type-of-stamp', void 0, 222132123123.001)
  t.equal(bstamp.val(stamp3), 222132123123.001, 'correct .val when no src')
  t.equal(bstamp.parse(stamp3).val, 222132123123.001, 'correct parse.val when no src')
})

test('parse stamps', t => {
  parse(bstamp.create('type', 'source', 1), { src: 'source', type: 'type', val: 1 })
  parse(bstamp.create(false, 'source', 1), { src: 'source', val: 1 })
  parse(bstamp.create(false, false, 1), { val: 1 })
  function parse (val, result) {
    t.deepEqual(bstamp.parse(val), result, '"' + val + '" parsed correctly')
  }
  t.end()
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
