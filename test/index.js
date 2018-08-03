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

  it('should allow modification of schema', function() {
    let result = validator(fixtures['missingPortMapping']);
    expect(result.errors.length).to.equal(0);

    function schemaUpdate(schema) {
      if (schema.id !== '/containerDefinition') return schema;

      schema.required.push('portMappings');
      return schema;
    }

    let result2 = validator(fixtures['missingPortMapping'], schemaUpdate);
    expect(result2.errors.length).to.be.greaterThan(0);
  });
});
