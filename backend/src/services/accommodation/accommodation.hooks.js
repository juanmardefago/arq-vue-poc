const { authenticate } = require('@feathersjs/authentication').hooks;
const permissionsCheck = require('../../hooks/permissions');
const approvePermissions = require('../../hooks/approvePermissions');
const imageUpload = require('../../hooks/imageUpload');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ approvePermissions('admin') ],
    update: [ approvePermissions('admin') ],
    patch: [ imageUpload(), approvePermissions('admin') ],
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
