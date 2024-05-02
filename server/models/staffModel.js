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
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
