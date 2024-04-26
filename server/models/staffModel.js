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
    },
    staffSubject: {
      type: String,
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
