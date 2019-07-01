module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    email: {type: String, unique: true, lowercase: true},
    password: { type: String },
    permissions: { type: String },
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
