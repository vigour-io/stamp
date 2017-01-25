const test = require('tape')
var bstamp = require('../')

test('parse stamps', t => {
  const d = Date.now()
  t.equal(bstamp.parse(bstamp.create()), d)
  t.equal(bstamp.parse(bstamp.create(-1)), -1)
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
