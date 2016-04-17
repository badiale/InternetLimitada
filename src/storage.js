var storage = typeof localStorage !== 'undefined' ? localStorage : new Storage()

exports.get = function (key) {
  return JSON.parse(storage.getItem(key) || 'null')
}

exports.put = function (key, value) {
  storage.setItem(key, JSON.stringify(value))
}

function Storage () {
  this.maps = {}
  this.contains = {}.hasOwnProperty.bind(this.maps)
}

Storage.prototype.getItem = function (key) {
  if (this.contains(key)) {
    return this.maps[ key ]
  }
  return null
}

Storage.prototype.setItem = function (key, value) {
  this.maps[ key ] = value
}
