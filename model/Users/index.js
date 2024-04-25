require('dotenv').config();
const mongoose = require('mongoose');
const generalSchema = require('./schema');
const path = require('path');
const { createHash } = require('crypto');

generalSchema.statics.createUser = async function () {
  const user = await this.findOne({ email: process.env.USER_EMAIL });

  if (!user) {
    const hash = createHash('sha256', 'sal').update(process.env.USER_PASSWORD).digest('hex');

    await this.create({ email: process.env.USER_EMAIL, password: hash });
  }
};

const modelname = path.basename(__dirname);
const model = mongoose.model(modelname, generalSchema);

module.exports = model;
