'use strict'
const vstamp = require('../')
const test = require('tape')
const perf = require('vigour-performance').run

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
