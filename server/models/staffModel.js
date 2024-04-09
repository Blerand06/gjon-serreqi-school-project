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
      enum: ['Arsimtar/e', 'Drejtor/eshë', 'Psikolog/e'],
    },
    staffSubject: {
      type: String,
      enum: ['Biologji', 'Matematikë', 'Anglisht', 'Kimi', ''],
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
