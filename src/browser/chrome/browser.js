/* globals chrome */
exports.browserName = 'chrome'

exports.log = function () {
  console.log.apply(console, arguments)
}

exports.onRequestStart = function (callback) {
  chrome.webRequest.onHeadersReceived.addListener(function (details) {
    return { cancel: callback(details) }
  }, { urls: [ 'http://*/*', 'https://*/*' ] }, [ 'blocking' ])
}

exports.onRequestEnd = function (callback) {
  chrome.webRequest.onCompleted.addListener(function (details) {
    callback(details.tabId, parseInt(findHeader(details.responseHeaders, 'content-length') || '0', 10))
  }, { urls: [ '<all_urls>' ] }, [ 'responseHeaders' ])
}

function findHeader (headers, headerName) {
  for (var i = 0; i < headers.length; ++i) {
    if (headers[ i ].name.toLowerCase() === headerName) {
      return headers[ i ].value
    }
  }
}

exports.showIcon = function (path) {
  chrome.browserAction.setIcon({
    path: path + '19.png'
  })
}

exports.showTextOnIcon = function (text) {
  chrome.browserAction.setBadgeText({
    text: text
  })
}

exports.options = {
  get: function (callback) {
    chrome.storage.sync.get({
      price: 89.9,
      limit: 130,
      icon: 'Bytes',
      block: true
    }, callback)
  }, set: function (values, callback) {
    chrome.storage.sync.set(values, callback)
  }
}
