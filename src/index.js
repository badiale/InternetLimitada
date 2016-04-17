var browser = require('browser')
var size = require('./size')
var plans = require('./plans')
var text = require('./iconText')

browser.onRequestEnd(function (id, total) {
  size.addSize(id, total)
})

setInterval(updateBadge, 500)

function updateBadge () {
  plans.isLimitExceeded(function (exceeded) {
    if (exceeded) {
      browser.showIcon('nowifi')
      browser.showTextOnIcon('')
    } else {
      browser.showIcon('wifi')
      browser.options.get(function (options) {
        text[ options.icon ](function (value) {
          browser.showTextOnIcon(value)
        })
      })
    }
  })
}
