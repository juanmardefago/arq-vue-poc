const errors = require('@feathersjs/errors');

module.exports = function(permissions) {
  return hook => {
    const realPermissions = hook.params.user.permissions;
    if (hook.data.approved && realPermissions !== permissions) {
      throw new errors.Forbidden(`Permission error, was expecting ${permissions} but received ${realPermissions}`);
    } else {
      return hook;
    }
  };
};
