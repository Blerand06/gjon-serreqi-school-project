const mongoose = require('mongoose');

const planSchema = mongoose.Schema(
  {
    planYear: {
      type: String,
      required: true,
    },
    planDocument: {
      type: String,
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
