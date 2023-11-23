'use strict'

module.exports.up = function (next) {
  next()
}

module.exports.down = function (next) {
  next()
}

module.exports.up2 = function (next) {
  console.log("---------------------- up2  exceuted ----")
  next()
}