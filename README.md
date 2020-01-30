# plantuml-encoder
PlantUML encoder for browsers and Node.js.

[![npm Version](https://img.shields.io/npm/v/@anb0s/plantuml-encoder.svg)](https://www.npmjs.com/package/@anb0s/plantuml-encoder) [![build-status](https://travis-ci.org/anb0s/plantuml-encoder.svg?branch=master)](https://travis-ci.org/anb0s/plantuml-encoder) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Encoded PlantUML can be used to create PlantUML URL links. It resolves PlantUML 'include' statements before encoding.

# Install

Node.js:

```
npm install @anb0s/plantuml-encoder
```

browser:

```
bower install @anb0s/plantuml-encoder
```

# Example

```javascript
var plantumlEncoder = require('@anb0s/plantuml-encoder')

var encoded = plantumlEncoder.encode('A -> B: Hello')
console.log(encoded) // SrJGjLDmibBmICt9oGS0

var url = 'http://www.plantuml.com/plantuml/img/' + encoded
```

The URL can then be used to display the diagram:

![alt tag](http://www.plantuml.com/plantuml/img/SrJGjLDmibBmICt9oGS0)

# Decode example

```javascript
var plantumlEncoder = require('@anb0s/plantuml-encoder')

var plain = plantumlEncoder.decode('SrJGjLDmibBmICt9oGS0')
console.log(plain) // A -> B: Hello

```

# License
MIT
