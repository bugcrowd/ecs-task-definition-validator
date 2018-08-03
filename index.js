'use strict'

var Validator = require('jsonschema').Validator;

const taskDefinitionSchema = {
  'id': '/taskDefinition',
  'type': 'object',
  'required': ['family', 'containerDefinitions'],
  'properties': {
    'family': {
      'type': 'string'
    },
    'taskRoleArn': {
      'type': 'string'
    },
    'executionRoleArn': {
      'type': 'string'
    },
    'networkMode': {
      'type': 'string'
    },
    'cpu': {
      'type': 'string'
    },
    'containerDefinitions': {
      'type': 'array',
      'items': {
        '$ref': '/containerDefinition'
      }
    },
    'volumes': {
      'type': 'array',
      'items': {
        '$ref': '/volume'
      }
    },
    'placementConstraints': {
      'type': 'array',
      'items': {
        '$ref': '/placementConstraint'
      }
    },
    'requiresCompatibilities': {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    },
  }
};

const containerDefinitionSchema = {
  'id': '/containerDefinition',
  'type': 'object',
  'required': ['name', 'image'],
  'properties': {
    'name': {
      'type': 'string'
    },
    'image': {
      'type': 'string'
    },
    'memory': {
      'type': 'integer'
    },
    'memoryReservation': {
      'type': 'integer'
    },
    'portMappings': {
      'type': 'array',
      'items': {
        '$ref': '/containerPortMapping'
      }
    },
    'healthCheck': {
      '$ref': '/containerHealthCheck'
    },
    'cpu': {
      'type': 'integer'
    },
    'essential': {
      'type': 'boolean'
    },
    'entryPoint': {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    },
    'command': {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    },
    'workingDirectory': {
      'type': 'string'
    },
    'environment': {
      'type': 'array',
      'items': {
        '$ref': '/containerEnvironment'
      }
    },
    'disableNetworking': {
      'type': 'boolean'
    },
    'links': {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    },
    'hostname': {
      'type': 'string'
    },
    'dnsServers': {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    },
    'dnsSearchDomains': {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    },
    'extraHosts': {
      'type': 'array',
      'items': {
        '$ref': '/containerExtraHost'
      }
    },
    'readonlyRootFilesystem': {
      'type': 'boolean'
    },
    'mountPoints': {
      'type': 'array',
      'items': {
        '$ref': '/containerMountPoint'
      }
    },
    'volumesFrom': {
      'type': 'array',
      'items': {
        '$ref': '/containerVolumesFrom'
      }
    },
    'logConfiguration': {
      '$ref': '/containerLogConfiguration'
    },
    'privileged': {
      'type': 'boolean'
    },
    'user': {
      'type': 'string'
    },
    'dockerSecurityOptions': {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    },
    'ulimits': {
      'type': 'array',
      'items': {
        '$ref': '/containerUlimits'
      }
    },
    'dockerLabels': {
      'type': 'object'
    },
    'linuxParameters': {
      '$ref': '/containerLinuxParameters'
    },
  }
};

const containerPortMappingSchema = {
  'id': '/containerPortMapping',
  'type': 'object',
  'required': ['containerPort'],
  'properties': {
    'containerPort': {
      'type': 'integer'
    },
    'integer': {
      'type': 'integer'
    },
    'protocol': {
      'type': 'string'
    },
  }
};

const containerHealthCheckSchema = {
  'id': '/containerHealthCheck',
  'type': 'object',
  'properties': {
    'command': {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    },
    'interval': {
      'type': 'integer'
    },
    'timeout': {
      'type': 'integer'
    },
    'retries': {
      'type': 'integer'
    },
    'startPeriod': {
      'type': 'integer'
    },
  }
};

const containerEnvironmentSchema = {
  'id': '/containerEnvironment',
  'type': 'object',
  'required': ['name', 'value'],
  'properties': {
    'name': {
      'type': 'string'
    },
    'value': {
      'type': 'string'
    },
  }
};

const containerExtraHostSchema = {
  'id': '/containerExtraHost',
  'type': 'object',
  'required': ['hostname', 'ipAddress'],
  'properties': {
    'hostname': {
      'type': 'string'
    },
    'ipAddress': {
      'type': 'string'
    },
  }
};

const containerMountPointSchema = {
  'id': '/containerMountPoint',
  'type': 'object',
  'required': ['sourceVolume', 'containerPath'],
  'properties': {
    'sourceVolume': {
      'type': 'string'
    },
    'containerPath': {
      'type': 'string'
    },
    'readOnly': {
      'type': 'boolean'
    },
  }
};

const containerVolumesFromSchema = {
  'id': '/containerVolumesFrom',
  'type': 'object',
  'required': ['sourceContainer'],
  'properties': {
    'sourceContainer': {
      'type': 'string'
    },
    'readOnly': {
      'type': 'boolean'
    },
  }
};

const containerLogConfigurationSchema = {
  'id': '/containerLogConfiguration',
  'type': 'object',
  'required': ['logDriver'],
  'properties': {
    'logDriver': {
      'type': 'string'
    },
    'options': {
      'type': 'object'
    },
  }
};

const containerUlimitsSchema = {
  'id': '/containerUlimits',
  'type': 'object',
  'required': ['name', 'hardLimit', 'softLimit'],
  'properties': {
    'name': {
      'type': 'string'
    },
    'hardLimit': {
      'type': 'integer'
    },
    'softLimit': {
      'type': 'integer'
    },
  }
};

const containerLinuxParametersSchema = {
  'id': '/containerLinuxParameters',
  'type': 'object',
  'properties': {
    'capabilities': {
      '$ref': '/containerLinuxParametersCapability'
    },
    'devices': {
      'type': 'array',
      'items': {
        '$ref': '/containerLinuxParametersDevice'
      }
    },
    'initProcessEnabled': {
      'type': 'boolean'
    },
    'sharedMemorySize': {
      'type': 'integer'
    },
    'tmpfs': {
      'type': 'array',
      'items': {
        '$ref': '/containerLinuxParametersTmpfs'
      }
    },
  }
};

const containerLinuxParametersCapabilitySchema = {
  'id': '/containerLinuxParametersCapability',
  'type': 'object',
  'properties': {
    'add': {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    },
    'drop': {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    },
  }
};

const containerLinuxParametersDeviceSchema = {
  'id': '/containerLinuxParametersDevice',
  'type': 'object',
  'required': ['hostPath'],
  'properties': {
    'hostPath': {
      'type': 'string'
    },
    'containerPath': {
      'type': 'string'
    },
    'permissions': {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    },
  }
};

const containerLinuxParametersTmpfsSchema = {
  'id': '/containerLinuxParametersTmpfs',
  'type': 'object',
  'required': ['containerPath'],
  'properties': {
    'containerPath': {
      'type': 'string'
    },
    'mountOptions': {
      'type': 'array',
      'items': {
        'type': 'string'
      }
    },
    'size': {
      'type': 'integer'
    }
  }
};

const volume = {
  'id': '/volume',
  'type': 'object',
  'required': ['name'],
  'properties': {
    'name': {
      'type': 'string'
    },
    'host': {
      '$ref': '/volumeHost'
    },
  }
};

const volumeHostSchema = {
  'id': '/volumeHost',
  'type': 'object',
  'properties': {
    'sourcePath': {
      'type': 'string'
    }
  }
};

const placementConstraintSchema = {
  'id': '/placementConstraint',
  'type': 'object',
  'required': ['type'],
  'properties': {
    'expression': {
      'type': 'string'
    },
    'type': {
      'type': 'string'
    },
  }
};

module.exports = function(taskDefinition, schemaTransformFn) {
  if (!schemaTransformFn) schemaTransformFn = (schema) => schema;
  let v = new Validator();

  let schemas = [
    containerDefinitionSchema,
    containerPortMappingSchema,
    containerHealthCheckSchema,
    containerEnvironmentSchema,
    containerExtraHostSchema,
    containerMountPointSchema,
    containerVolumesFromSchema,
    containerLogConfigurationSchema,
    containerUlimitsSchema,
    containerLinuxParametersSchema,
    containerLinuxParametersCapabilitySchema,
    containerLinuxParametersDeviceSchema,
    containerLinuxParametersTmpfsSchema,
    volume,
    volumeHostSchema,
    placementConstraintSchema,
  ];

  schemas.forEach((schema) => {
    let modifiedSchema = schemaTransformFn(schema);
    // console.log(modifiedSchema);
    v.addSchema(modifiedSchema, modifiedSchema.id);
  });

  return v.validate(taskDefinition, taskDefinitionSchema);
};
