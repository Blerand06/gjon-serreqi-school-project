const mongoose = require('mongoose');

const staffSchema = mongoose.Schema(
  {
    staffName: {
      type: String,
      required: true,
    },
    staffPhoto: {
      contentType: String,
      data: Buffer,
    },
    staffCV: {
      contentType: String,
      data: Buffer,
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
