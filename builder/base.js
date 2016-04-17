var Q = require('q')
var fs = require('fs')
var mkdirp = require('mkdirp')
var browserify = require('browserify')
var cpr = require('cpr')
var pn = require('pn/fs')
var svg2png = require('svg2png')

exports.dir = function (name) {
  var defer = Q.defer()
  mkdirp(name, function (err) {
    if (err) {
      defer.reject(err)
      return
    }
    defer.resolve()
  })
  return defer.promise
}

exports.bundler = function (browserLib) {
  return function (file, dest) {
    var defer = Q.defer()
    browserify()
      .add(file)
      .require(browserLib, { expose: 'browser' })
      .bundle()
      .pipe(fs.createWriteStream(dest))
      .on('error', defer.reject).on('finish', defer.resolve)
    return defer.promise
  }
}

exports.cp = function (origin, dest) {
  var defer = Q.defer()
  cpr(origin, dest, function (err) {
    if (err) {
      defer.reject(err)
      return
    }
    defer.resolve()
  })
  return defer.promise
}

exports.resizeSVG = function (file, dest, size) {
  return pn.readFile(file)
    .then(function (buffer) {
      return svg2png(buffer, { width: size, height: size })
    })
    .then(function (buffer) {
      return pn.writeFile(dest, buffer)
    })
}

exports.error = function () {
  console.error(arguments)
  process.exit(1)
}
