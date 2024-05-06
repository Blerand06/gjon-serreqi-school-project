const mongoose = require('mongoose');

const staffSchema = mongoose.Schema(
  {
    staffName: {
      type: String,
      required: true,
    },
    staffPhoto: {
      type: String,
    },
    staffCV: {
      type: String,
    },
    staffRole: {
      type: String,
      required: true,
    },
    staffSubject: {
      type: String,
      required: true,
    },
    staffCategory: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
