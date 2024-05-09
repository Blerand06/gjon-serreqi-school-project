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
      required: true,
    },
    subjectClass: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model('Subject', subjectsSchema);

module.exports = Subject;
