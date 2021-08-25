ECS Task Definition Validator
=============================

ECS Task Definition Validator uses JSON Schema to validate ECS Task Definitions.

Installation
------------

**NOTE:** We have moved the package under our `bugcrowd` NPM organization - this will be the only package location maintained going forward.

`npm install @bugcrowd/ecs-task-definition-validator --save`

Usage
-----

### Basic

```js
const validator = require('ecs-task-definition-validator');
let taskDefinition = {
  // your task definition here
}

let result = validator(taskDefinition);
if (result.errors.length > 0) {
  // do whatever you do when validation fails
}
```

### Schema Modification
You can pass a function as the second argument to do runtime modification of
the JSON Schemas.

```js
// Force portMappings parameter to be required
function schemaUpdate(schema) {
  if (schema.id !== '/containerDefinition') return schema;

  schema.required.push('portMappings');
  return schema;
}

let result = validator(taskDefinition, schemaUpdate);
```
