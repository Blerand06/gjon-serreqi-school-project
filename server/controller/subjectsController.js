const Subject = require('../models/subjectsModel');
const path = require('path');

const registerSubject = async (req, res) => {
  const { subjectName, subjectCycle, subjectClass } = req.body;
  const subjectIcon = req.files;
  console.log(req.files);

  try {
    let subject_number = 1;
    const subjectOnDb = await Subject.findOne()
      .sort({ createdAt: -1 })
      .select('subject_number');
    if (subjectOnDb) {
      subject_number = parseInt(subjectOnDb.subject_number) + 1;
    }
    const newSubject = new Subject({
      subjectName,
      subjectIcon: subjectIcon.path,
      subjectCycle,
      subjectClass,
      subject_number,
    });

    await newSubject.save();

    await res.status(201).json({
      subject: newSubject._id,
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSubject = async (req, res) => {
  try {
    const subject = await Subject.find({});
    res.send({ data: subject, status: 'success' });
  } catch (error) {
    res.send({ data: [], status: 'fail' });
  }
};

const updateSubject = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'Data to be updated cannot be empty.' });
  }

  const id = req.body.id;
  Subject.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update subject with the id of ${id}. Maybe order not found.`,
          status: 'fail',
        });
      } else {
        res.send({ data, status: 'success' });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: 'Error updating subject information',
        status: 'fail',
      });
    });
};

const deleteSubject = async (req, res) => {
  const id = req.body.id;

  Subject.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete with id: ${id}. Maybe the ID is wrong`,
          status: 'fail',
        });
      } else {
        res.status(200).send({
          message: 'Subject was deleted successfully!',
          status: 'success',
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Could not delete subject with id: ${id}`,
        status: 'fail',
      });
    });
};

module.exports = { registerSubject, getSubject, updateSubject, deleteSubject };
