const accommodation = require('./accommodation/accommodation.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(accommodation);
};
