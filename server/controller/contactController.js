const Contact = require('../models/contactModel');

const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.send({ data: contacts, status: 'success' });
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

const deleteContact = async (req, res) => {
  const id = req.body.id;

  Contact.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete with id: ${id}. Maybe the ID is wrong`,
          status: 'fail',
        });
      } else {
        res.status(200).send({
          message: 'Contact was deleted successfully!',
          status: 'success',
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Could not delete contact with id: ${id}`,
        status: 'fail',
      });
    });
};

module.exports = { getContact, registerContact, deleteContact };
