const mongoose = require('mongoose');

const { Schema } = mongoose;

const StagingSchema = new Schema(
  {
    numbers: {
      type: Object,
      default: {},
    },

    gameType: {
      type: String,
      required: true,
    },

    restrictTime: {
      type: Date,
      default: Date.now(),
    },

    endTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

StagingSchema.set('toJSON', {
  virtuals: true,
});

const Staging = mongoose.model('staging', StagingSchema);

module.exports = Staging;
