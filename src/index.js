var browser = require('browser')
var format = require('./format')
var size = require('./size')
var plans = require('./plans')

updateBadge()

browser.onRequestEnd(function (id, total) {
  size.addSize(id, total)
  updateBadge()
})

function updateBadge () {
  if (plans.isLimitExceeded()) {
    browser.showIcon('nowifi')
    browser.showTextOnIcon('')
  } else {
    browser.showIcon('wifi')
    browser.showTextOnIcon(format.bytes(size.getMonthTotal()))
  }
}
