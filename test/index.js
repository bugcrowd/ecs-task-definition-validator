'use strict'

const expect = require('expect.js');

const validator = require('../');
const fixtures = require('./fixtures');

describe('EcsTaskDefinitionValidator', function() {
  it('should return errors when validating a Task Definition with missing fields', function() {
    let result = validator(fixtures['missingFieldsTaskDefinition']);
    expect(result.errors.length).to.be.greaterThan(0);
  });

  it('should validate a valid Task Definition', function() {
    let result = validator(fixtures['validTaskDefinition']);
    expect(result.errors.length).to.equal(0);
  });
});
