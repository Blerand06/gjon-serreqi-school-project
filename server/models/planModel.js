const mongoose = require('mongoose');

const planSchema = mongoose.Schema(
  {
    planYear: {
      type: String,
      required: true,
    },
    planDocument: {
      contentType: String,
      data: Buffer,
    },
  },
  { timestamps: true }
);

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
