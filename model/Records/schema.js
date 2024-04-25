const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema(
  {
    year: {
      type: String,
    },
    industry_aggregation: {
      type: String,
    },
    industry_code: {
      type: String,
    },
    industry_name: {
      type: String,
    },
    units: {
      type: String,
    },
    variable_code: {
      type: String,
    },
    variable_name: {
      type: String,
    },
    variable_category: {
      type: String,
    },
    value: {
      type: String,
    },
  },
  { versionKey: false },
);
