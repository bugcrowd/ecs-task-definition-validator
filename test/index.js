'use strict'

const expect = require('expect.js');

const validator = require('../');
const fixtures = require('./fixtures');

describe('EcsTaskDefinitionValidator', function() {
  it('should validate a valid Task Definition', function() {
    let result = validator(fixtures['validTaskDefinition']);
    expect(result.errors.length).to.equal(0);
  });
});
