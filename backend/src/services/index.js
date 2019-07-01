const accommodation = require('./accommodation/accommodation.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(accommodation);
  app.configure(users);
};
