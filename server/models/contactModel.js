const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
  {
    contactEmail: {
      type: String,
    },
    contactTitle: {
      type: String,
    },
    contactMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
