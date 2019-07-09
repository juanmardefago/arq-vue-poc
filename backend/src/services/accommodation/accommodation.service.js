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

  // Initialize our service with any options it requires
  app.use('/accommodation', createService(options));
  // app.use('/accommodation/:id', createService({ Model, id}));

  // Multer storage config
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      });
    }
  });
  var upload = multer({ storage: storage });

// Image upload endpoint
  app.post('/accommodation/upload',  upload.array('photos'), (req, res, next) => {
  const files = req.files
  console.log(req.files);
  if (!files) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(files)

})

  // Get our initialized service so that we can register hooks
  const service = app.service('accommodation');

  service.hooks(hooks);
};
