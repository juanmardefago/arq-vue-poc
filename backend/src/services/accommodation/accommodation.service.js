// Initializes the `accommodation` service on path `/accommodation`
const createService = require('feathers-mongoose');
const createModel = require('../../models/accommodation.model');
const hooks = require('./accommodation.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');
  // const id = app.get('id');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/accommodation', createService(options));
  // app.use('/accommodation/:id', createService({ Model, id}));

  // Get our initialized service so that we can register hooks
  const service = app.service('accommodation');

  service.hooks(hooks);
};
