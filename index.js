'use strict'

var Validator = require('jsonschema').Validator;
var v = new Validator();

const taskDefinitionSchema = {
  'id': '/taskDefinition',
  'type': 'object',
  'required': [ 'family', 'containerDefinitions' ],
  'properties': {
    'family': { 'type': 'string' },
    'taskRoleArn': { 'type': 'string' },
    'executionRoleArn': { 'type': 'string' },
    'networkMode': { 'type': 'string' },
    'cpu': { 'type': 'string' },
    'containerDefinitions': {
      'type': 'array',
      'items': { '$ref': '/containerDefinition' }
    },
    'volumes': {
      'type': 'array',
      'items': { '$ref': '/volume' }
    },
    'placementConstraints': {
      'type': 'array',
      'items': { '$ref': '/placementConstraint' }
    },
    'requiresCompatibilities': {
      'type': 'array',
      'items': { 'type': 'string' }
    },
  }
};

const containerDefinitionSchema = {
  'id': '/containerDefinition',
  'type': 'object',
  'properties': {
    'name': { 'type': 'string' },
    'image': { 'type': 'string' },
    'memory': { 'type': 'integer' },
    'memoryReservation': { 'type': 'integer' },
    'portMappings': {
      'type': 'array',
      'items': { '$ref': '/containerPortMapping' }
    },
    'healthCheck': { '$ref': '/containerHealthCheck' },
    'cpu': { 'type': 'integer' },
    'essential': { 'type': 'boolean' },
    'entryPoint': {
      'type': 'array',
      'items': { 'type': 'string' }
    },
    'command': {
      'type': 'array',
      'items': { 'type': 'string' }
    },
    'workingDirectory': { 'type': 'string' },
    'environment': {
      'type': 'array',
      'items': { '$ref': '/containerEnvironment' }
    },
    'disableNetworking': { 'type': 'boolean' },
    'links': {
      'type': 'array',
      'items': { 'type': 'string' }
    },
    'hostname': { 'type': 'string' },
    'dnsServers': {
      'type': 'array',
      'items': { 'type': 'string' }
    },
    'dnsSearchDomains': {
      'type': 'array',
      'items': { 'type': 'string' }
    },
    'extraHosts': {
      'type': 'array',
      'items': { '$ref': '/containerExtraHost' }
    },
    'readonlyRootFilesystem': { 'type': 'boolean' },
    'mountPoints': {
      'type': 'array',
      'items': { '$ref': '/containerMountPoint' }
    },
    'volumesFrom': {
      'type': 'array',
      'items': { '$ref': '/containerVolumesFrom' }
    },
    'logConfiguration': { '$ref': '/containerLogConfiguration' },
    'privileged': { 'type': 'boolean' },
    'user': { 'type': 'string' },
    'dockerSecurityOptions': {
      'type': 'array',
      'items': { 'type': 'string' }
    },
    'ulimits': {
      'type': 'array',
      'items': { '$ref': '/containerUlimits' }
    },
    'dockerLabels': { 'type': 'object' },
    'linuxParameters': { '$ref': '/containerLinuxParameters' },
  }
};
v.addSchema(containerDefinitionSchema, containerDefinitionSchema.id);

const containerPortMappingSchema = {
  'id': '/containerPortMapping',
  'type': 'object',
  'required': [ 'containerPort' ],
  'properties': {
    'containerPort': { 'type': 'integer' },
    'integer': { 'type': 'integer' },
    'protocol': { 'type': 'string' },
  }
};
v.addSchema(containerPortMappingSchema, containerPortMappingSchema.id);

const containerHealthCheckSchema = {
  'id': '/containerHealthCheck',
  'type': 'object',
  'properties': {
    'command': {
      'type': 'array',
      'items': { 'type': 'string' }
    },
    'interval': { 'type': 'integer' },
    'timeout': { 'type': 'integer' },
    'retries': { 'type': 'integer' },
    'startPeriod': { 'type': 'integer' },
  }
};
v.addSchema(containerHealthCheckSchema, containerHealthCheckSchema.id);

const containerEnvironmentSchema = {
  'id': '/containerEnvironment',
  'type': 'object',
  'required': [ 'name', 'value' ],
  'properties': {
    'name': { 'type': 'string' },
    'value': { 'type': 'string' },
  }
};
v.addSchema(containerEnvironmentSchema, containerEnvironmentSchema.id);

const containerExtraHostSchema = {
  'id': '/containerExtraHost',
  'type': 'object',
  'required': [ 'hostname', 'ipAddress' ],
  'properties': {
    'hostname': { 'type': 'string' },
    'ipAddress': { 'type': 'string' },
  }
};
v.addSchema(containerExtraHostSchema, containerExtraHostSchema.id);

const containerMountPointSchema = {
  'id': '/containerMountPoint',
  'type': 'object',
  'required': [ 'sourceVolume', 'containerPath' ],
  'properties': {
    'sourceVolume': { 'type': 'string' },
    'containerPath': { 'type': 'string' },
    'readOnly': { 'type': 'boolean' },
  }
};
v.addSchema(containerMountPointSchema, containerMountPointSchema.id);

const containerVolumesFromSchema = {
  'id': '/containerVolumesFrom',
  'type': 'object',
  'required': [ 'sourceContainer' ],
  'properties': {
    'sourceContainer': { 'type': 'string' },
    'readOnly': { 'type': 'boolean' },
  }
};
v.addSchema(containerVolumesFromSchema, containerVolumesFromSchema.id);

const containerLogConfigurationSchema = {
  'id': '/containerLogConfiguration',
  'type': 'object',
  'required': [ 'logDriver' ],
  'properties': {
    'logDriver': { 'type': 'string' },
    'options': { 'type': 'object' },
  }
};
v.addSchema(containerLogConfigurationSchema, containerLogConfigurationSchema.id);

const containerUlimitsSchema = {
  'id': '/containerUlimits',
  'type': 'object',
  'required': [ 'name', 'hardLimit', 'softLimit' ],
  'properties': {
    'name': { 'type': 'string' },
    'hardLimit': { 'type': 'integer' },
    'softLimit': { 'type': 'integer' },
  }
};
v.addSchema(containerUlimitsSchema, containerUlimitsSchema.id);

const containerLinuxParametersSchema = {
  'id': '/containerLinuxParameters',
  'type': 'object',
  'properties': {
    'capabilities': { '$ref': '/containerLinuxParametersCapability' },
    'devices': {
      'type': 'array',
      'items': { '$ref': '/containerLinuxParametersDevice' }
    },
    'initProcessEnabled': { 'type': 'boolean' },
    'sharedMemorySize': { 'type': 'integer' },
    'tmpfs':  {
      'type': 'array',
      'items': { '$ref': '/containerLinuxParametersTmpfs' }
    },
  }
};
v.addSchema(containerLinuxParametersSchema, containerLinuxParametersSchema.id);

const containerLinuxParametersCapabilitySchema = {
  'id': '/containerLinuxParametersCapability',
  'type': 'object',
  'properties': {
    'add': {
      'type': 'array',
      'items': { 'type': 'string' }
    },
    'drop': {
      'type': 'array',
      'items': { 'type': 'string' }
    },
  }
};
v.addSchema(containerLinuxParametersCapabilitySchema, containerLinuxParametersCapabilitySchema.id);

const containerLinuxParametersDeviceSchema = {
  'id': '/containerLinuxParametersDevice',
  'type': 'object',
  'required': [ 'hostPath' ],
  'properties': {
    'hostPath': { 'type': 'string' },
    'containerPath': { 'type': 'string' },
    'permissions': {
      'type': 'array',
      'items': { 'type': 'string' }
    },
  }
};
v.addSchema(containerLinuxParametersDeviceSchema, containerLinuxParametersDeviceSchema.id);

const containerLinuxParametersTmpfsSchema = {
  'id': '/containerLinuxParametersTmpfs',
  'type': 'object',
  'required': [ 'containerPath' ],
  'properties': {
    'containerPath': { 'type': 'string' },
    'mountOptions': {
      'type': 'array',
      'items': { 'type': 'string' }
    },
    'size': { 'type': 'integer' }
  }
};
v.addSchema(containerLinuxParametersTmpfsSchema, containerLinuxParametersTmpfsSchema.id);

const volume = {
  'id': '/volume',
  'type': 'object',
  'required': [ 'name' ],
  'properties': {
    'name': { 'type': 'string' },
    'host': { '$ref': '/volumeHost' },
  }
};
v.addSchema(volume, volume.id);

const volumeHostSchema = {
  'id': '/volumeHost',
  'type': 'object',
  'properties': {
    'sourcePath': { 'type': 'string' }
  }
};
v.addSchema(volumeHostSchema, volumeHostSchema.id);

const placementConstraintSchema = {
  'id': '/placementConstraint',
  'type': 'object',
  'required': [ 'type' ],
  'properties': {
    'expression': { 'type': 'string' },
    'type': { 'type': 'string' },
  }
};
v.addSchema(placementConstraintSchema, placementConstraintSchema.id);

module.exports = function(taskDefinition) {
  return v.validate(taskDefinition, taskDefinitionSchema);
};
