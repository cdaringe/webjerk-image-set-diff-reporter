'use strict'

var path = require('path').posix
var fs = require('fs-extra')
var spawn = require('cross-spawn-promise')
var bb = require('bluebird')
bb.promisifyAll(fs)

module.exports = function webjerkImageSetDiffReporter ({ differences, dest }) {
  if (!dest) return Promise.reject(new Error('missing dest'))
  var diffBasename = `differences-${Date.now()}.json`
  var serializedDiffs = JSON.stringify(differences, null, 2)
  var buildDir = path.join(__dirname, 'build')
  return Promise.resolve()
  .then(() => Promise.all([
    fs.removeAsync(buildDir),
    fs.removeAsync(dest)
  ]))
  .then(() => {
    var env = Object.assign(process.env, { REACT_APP_DIFFS: diffBasename })
    return spawn('npm', ['run', 'build'], { cwd: __dirname, env })
  })
  .then(() => fs.moveAsync(path.join(__dirname, 'build'), dest))
  .then(() => fs.writeFileAsync(path.join(dest, diffBasename), serializedDiffs))
  .then(() => Promise.all(differences.map(diff => {
    return Promise.all([
      fs.copyAsync(diff.aFilename, path.join(dest, `a-${diff.name}`)),
      fs.copyAsync(diff.bFilename, path.join(dest, `b-${diff.name}`))
    ])
  })))
}
