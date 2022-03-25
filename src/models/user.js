const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    token: {
      type: String,
      required: true,
    },

    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      console.log('[USER_MODEL]:[ERROR]: user auth failed');
      return callback(err);
    }

    callback(null, isMatch);
  });
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
