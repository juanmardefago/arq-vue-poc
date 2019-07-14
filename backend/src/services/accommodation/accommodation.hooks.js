const { authenticate } = require('@feathersjs/authentication').hooks;
const permissionsCheck = require('../../hooks/permissions');
const approvePermissions = require('../../hooks/approvePermissions');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ approvePermissions('admin') ],
    update: [ approvePermissions('admin') ],
    patch: [ approvePermissions('admin') ],
    remove: [ permissionsCheck('admin') ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
