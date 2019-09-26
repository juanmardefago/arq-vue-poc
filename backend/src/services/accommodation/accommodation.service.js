// Initializes the `accommodation` service on path `/accommodation`
const createService = require('feathers-mongoose');
const createModel = require('../../models/accommodation.model');
const hooks = require('./accommodation.hooks');
// Multer requirements
var multer  = require('multer');
const crypto = require('crypto');
const mime = require('mime');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');
  // const id = app.get('id');

  const options = {
    Model,
    paginate
  };
  // Multer storage config
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      });
    }
  });
  var upload = multer({ storage: storage });
  // Initialize our service with any options it requires
  app.use('/accommodation', upload.array('photos'), (req, _res, next) => {
    req.feathers.files = req.files; // transfer the received files to feathers
    next();
  }, createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('accommodation');

  service.hooks(hooks);
};
