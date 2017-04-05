'use strict'

var tape = require('tape')
var reporter = require('../')
var path = require('path')
var fs = require('fs-extra')
var bb = require('bluebird')
bb.promisifyAll(fs)

tape('reporter', t => {
  t.plan(2)
  var name = 'test-img.png'
  var dest = path.join(__dirname, '__test_site')
  return reporter({
    differences: [
      {
        name,
        aFilename: path.join(__dirname, 'case-base', 'ref', name),
        bFilename: path.join(__dirname, 'case-base', 'run', name)
      }
    ],
    dest
  })
  .then(() => fs.lstatAsync(path.join(dest, `a-${name}`)))
  .then(stat => t.ok(stat, 'static site generated'))
  .then(() => fs.removeAsync(dest))
  .then(() => t.pass('teardown'))
  .then(t.end, t.end)
})
