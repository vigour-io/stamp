'use strict'
const test = require('tape')

test('version resolve', function (t) {
  global.__bstamp__ = { version: '1.2.11' }
  // need ot say incompatibvle as well how to test?
  const previous = global.__bstamp__
  const vstamp = require('../')
  t.equal(vstamp, require('../'), 'choose newsest version')
  t.equal(vstamp, global.__bstamp__, 'overrides global')
  for (let i in vstamp) {
    t.ok(previous[i] === vstamp[i], `"${i}" on previous from current`)
  }
  t.equal(vstamp.resolve({ version: '2.0.1' }, { version: '2.0.2' }).version, '2.0.2', 'correct patch righthand')
  t.equal(vstamp.resolve({ version: '2.0.2' }, { version: '2.0.1' }).version, '2.0.2', 'correct patch lefthand')
  t.equal(vstamp.resolve({ version: '2.0.1' }, { version: '2.1.2' }).version, '2.1.2', 'correct minor righthand')
  t.equal(vstamp.resolve({ version: '2.1.2' }, { version: '2.0.1' }).version, '2.1.2', 'correct minor lefthand')
  t.ok(vstamp.resolve({ version: '2.1.2' }, { version: '2.1.2', r: true }).r, 'on the same choose righthand')
  t.ok(vstamp.resolve({}, { version: '2.1.2', r: true }).r, 'on no version choose one with version')
  t.ok(vstamp.resolve({ version: '2.1.2', l: true }, {}).l, 'on no version choose one with version (lefthand)')
  t.ok(vstamp.resolve({}, { r: true }).r, 'on both no version choose righthand')
  try {
    vstamp.resolve({ version: '2.0.0' }, { version: '1.0.0' })
    t.fail('should throw error on major verison mismatch')
  } catch (e) {
    t.equal(e.message, 'incompatible major stamp versions 2.0.0 vs 1.0.0', 'throws error on major version mismatch')
  }
  t.end()
})
