const mongoose = require('mongoose');

const planSchema = mongoose.Schema(
  {
    planDocument: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
