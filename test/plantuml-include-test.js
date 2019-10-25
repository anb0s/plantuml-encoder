/* global describe it */
const chai = require('chai')
const plantumlEncoder = require('../index')
const browserEncoder = require('../dist/plantuml-encoder')
const minifiedEncoder = require('../dist/plantuml-encoder.min')
const browserDecoder = require('../dist/plantuml-decoder')
const minifiedDecoder = require('../dist/plantuml-decoder.min')

const expect = chai.expect

const umlWithInclude = `!include ./conf.plantuml

Bob->Alice : hello`

const umlWithoutInclude = `

Bob->Alice : hello`

const encoded = 'u-9ooa_IjNFCoKnELR1Io4ZDoSa70000'

describe('plantuml-encoder', function () {
  describe('#encode()', function () {
    it('node.js should include file and encode UTF-8', function () {
      const e = plantumlEncoder.encode(umlWithInclude)
      expect(e).to.equal(encoded)
    })
    it('browser should include file and encode UTF-8', function () {
      expect(browserEncoder.encode(umlWithInclude)).to.equal(plantumlEncoder.encode(umlWithInclude))
    })
    it('browser (minified) should include file and encode UTF-8', function () {
      expect(minifiedEncoder.encode(umlWithInclude)).to.equal(plantumlEncoder.encode(umlWithInclude))
    })
  })

  describe('#decode()', function () {
    it('node.js should decode UTF-8', function () {
      const decoded = plantumlEncoder.decode(encoded)
      expect(decoded).to.equal(umlWithoutInclude)
    })
    it('browser should decode UTF-8', function () {
      expect(browserDecoder.decode(encoded)).to.equal(plantumlEncoder.decode(encoded))
    })
    it('browser (minified) should decode UTF-8', function () {
      expect(minifiedDecoder.decode(encoded)).to.equal(plantumlEncoder.decode(encoded))
    })
  })
})
