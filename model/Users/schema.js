const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { versionKey: false },
);
