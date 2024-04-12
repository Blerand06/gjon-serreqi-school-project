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

const registerContact = async (req, res) => {
  const { contactEmail, contactTitle, contactMessage } = req.body;

  try {
    let contact_number = 1;
    const contactOnDb = await Contact.findOne()
      .sort({ createdAt: -1 })
      .select('contact_number');
    if (contactOnDb) {
      contact_number = parseInt(contactOnDb.contact_number) + 1;
    }

    const newContact = new Contact({
      contactEmail,
      contactTitle,
      contactMessage,
      contact_number,
    });

    await newContact.save();

    res.status(201).json({
      contact: newContact._id,
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteContact = async (req, res) => {};

module.exports = { getContact, registerContact, deleteContact };
