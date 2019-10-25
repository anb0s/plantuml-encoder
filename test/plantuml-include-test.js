/* global describe it */
const chai = require('chai')
const plantumlEncoder = require('../index')

const expect = chai.expect

const umlWithInclude = `!include ../test/conf.plantuml

Bob->Alice : hello`

const umlWithoutInclude = `hide empty members
skinparam backgroundColor white
skinparam monochrome true
skinparam shadowing false
skinparam linetype polyline
skinparam linetype ortho


Bob->Alice : hello`

const encoded = 'RScz3G8n30RGFbDu0HQWG08coOyvM-VaYvoSJjaUqLr1-VH42nFNFXTLhebzXB5hwz5ZfHJplZcELjumE9sYaozVqP35KPcc7zSP4WjERHjzeethc3QUgpDrsFhXty6d88JmGhezdgQPwKx2PlW2'

describe('plantuml-include', function () {
  describe('#encode()', function () {
    it('node.js should include file and encode UTF-8', function () {
      const e = plantumlEncoder.encode(umlWithInclude)
      expect(e).to.equal(encoded)
    })
  })

  describe('#decode()', function () {
    it('node.js should decode UTF-8', function () {
      const decoded = plantumlEncoder.decode(encoded)
      expect(decoded).to.equal(umlWithoutInclude)
    })
  })
})
