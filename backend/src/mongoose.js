const mongoose = require('mongoose');

function connectToMongo(uri, options, retriesLeft, retryDelay) {
  mongoose.connect(uri, options)
    .catch(() => {
      if(retriesLeft > 0) {
        setTimeout(connectToMongo(uri, options, retriesLeft - 1), retryDelay);
      }
    });
}

module.exports = function (app) {
  var uri = app.get('mongodb');
  var options = { useCreateIndex: true, useNewUrlParser: true };
  var retries = app.get('mongoConnectionRetries');
  var retryDelay = app.get('mongoConnectionRetryDelay');

  connectToMongo(uri, options, retries, retryDelay);

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
