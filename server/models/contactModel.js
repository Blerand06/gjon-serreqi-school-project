const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    contactEmail: {
      type: String,
      required: true,
    },
    contactTitle: {
      type: String,
      required: true,
    },
    contactMessage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
