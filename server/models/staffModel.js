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
      enum: [
        'Arsimtar/e',
        'Drejtor/eshë',
        'Psikolog/e',
        'Mësues/e',
        'Sekretar/eshë',
        'Zëvendësdrejtor/e',
        'Punëtor Teknik',
      ],
    },
    staffSubject: {
      type: String,
      enum: ['Biologji', 'Matematikë', 'Anglisht', 'Kimi', 'Gjuhë Shqipe', ''],
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
