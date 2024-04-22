const mongoose = require('mongoose');

const subjectsSchema = mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
    },
    subjectIcon: {
      type: String,
    },
    subjectCycle: {
      type: String,
      enum: ['I ulët', 'I lartë', 'Të gjithët'],
      required: true,
    },
    subjectClass: {
      type: String,
      enum: ['I-IX', 'II-IX', 'VI-IX', 'I-V', 'VII-IX'],
      required: true,
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model('Subject', subjectsSchema);

module.exports = Subject;
