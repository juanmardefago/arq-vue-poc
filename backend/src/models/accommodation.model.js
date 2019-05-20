// accommodation-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const accommodation = new Schema({
    location: {
      province: {
        name: {
          type: String,
          required: true,
        },
        id: {
          type: Number,
          required: true,
        },
      },
      city: {
        name: {
          type: String,
          required: true,
        },
        id: {
          type: Number,
          required: true,
        },
      },
      address: {
        type: String,
        required: true,
      },
    },
    type: {
      type: String,
      required: true,
      enum: ['Hotel', 'Posada', 'Cabaña', 'Otro'],
    },
    category: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    updated: {
      type: Date,
      default: Date.now
    },
  }, {
    timestamps: true
  });

  return mongooseClient.model('accommodation', accommodation);
};
