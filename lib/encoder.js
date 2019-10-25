'use strict'

var deflate = require('./deflate')
var encode64 = require('./encode64')

var fs = require('fs')
var path = require('path')

// This function replaces fs.existsSync which
// causes problems in browser environments
// Adapted from
// https://www.gregjs.com/javascript/2016/checking-whether-a-file-directory-exists-without-using-fs-exists/
function fsExistsSync (filePath) {
  try {
    fs.accessSync(filePath)
    return true
  } catch (e) {
    return false
  }
}

// Reads the contents of the file passed as parameter.
// If the file does not exist, just return an empty string.
function readFile (filename) {
  if (!fsExistsSync(filename)) {
    return ''
  }
  var filePath = path.join(__dirname, filename)
  return fs.readFileSync(filePath).toString()
}

// Tests whether the PlantUML text passed
// as parameter contains `!include` statements.
function containsIncludeStatement (puml) {
  return puml.includes('!include')
}

// Iterates over all the `!include` statements and
// returns a new string with those parameters replaced.
function replaceIncludes (puml) {
  var regex = /!include (.*)/gm
  var match
  var pumlCopy = puml

  while ((match = regex.exec(puml)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === regex.lastIndex) {
      regex.lastIndex++
    }

    var matchToReplace = ''
    match.forEach(function (match, groupIndex) {
      // Each entry in `match` contains first the matched string,
      // then the variable part, that is, the file name itself.
      // We keep the matchToReplace and then read the file,
      // and finally we replace the match with the contents of the file.
      if (containsIncludeStatement(match)) {
        matchToReplace = match
      } else {
        var file = readFile(match)
        pumlCopy = pumlCopy.replace(matchToReplace, file)
      }
    })
  }
  return pumlCopy
}

module.exports.encode = function (puml) {
  if (containsIncludeStatement(puml)) {
    puml = replaceIncludes(puml)
  }
  var deflated = deflate(puml)
  return encode64(deflated)
}
