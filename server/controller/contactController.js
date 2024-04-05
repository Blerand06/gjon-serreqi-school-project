const Contact = require('../models/contactModel');

const getContact = async (req, res) => {
  try {
    const contact = Contact.find({});
    res.send({ data: contact, status: 'success' });
  } catch (error) {
    console.log(error);
    res.send({ data: [], status: 'fail' });
  }
};

module.exports = { getContact };
