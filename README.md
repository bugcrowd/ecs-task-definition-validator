ECS Task Definition Validator
=============================

ECS Task Definition Validator uses JSON Schema to validate ECS Task Definitions.

Installation
------------

`npm install ecs-task-definition-validator --save`

Usage
-----

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
