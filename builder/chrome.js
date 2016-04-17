var base = require('./base')
var dir = base.dir
var bundle = base.bundler('./src/browser/chrome/browser.js')
var cp = base.cp
var resizeSVG = base.resizeSVG
var error = base.error

dir('dist/chrome').then(function () {
  return bundle('src/index.js', 'dist/chrome/index.js')
}).then(function () {
  return bundle('src/browser/chrome/popup.js', 'dist/chrome/popup.js')
}).then(function () {
  return bundle('src/browser/chrome/options.js', 'dist/chrome/options.js')
}).then(function () {
  return cp('resources/shared', 'dist/chrome')
}).then(function () {
  return cp('resources/chrome', 'dist/chrome')
}).then(function () {
  return resizeSVG('resources/shared/nowifi.svg', 'dist/chrome/nowifi16.png', 16)
}).then(function () {
  return resizeSVG('resources/shared/nowifi.svg', 'dist/chrome/nowifi19.png', 19)
}).then(function () {
  return resizeSVG('resources/shared/nowifi.svg', 'dist/chrome/nowifi48.png', 48)
}).then(function () {
  return resizeSVG('resources/shared/nowifi.svg', 'dist/chrome/nowifi128.png', 128)
}).then(function () {
  return resizeSVG('resources/shared/wifi.svg', 'dist/chrome/wifi19.png', 19)
}).catch(error)
