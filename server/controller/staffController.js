const Staff = require('../models/staffModel');

const registerStaff = async (req, res) => {
  const { staffName, staffPhoto, staffCV } = req.body;

  try {
    let staff_number = 1;
    const staffOnDb = await Staff.findOne()
      .sort({ createdAt: -1 })
      .select('staff_number');
    if (staffOnDb) {
      staff_number = parseInt(staffOnDb.staff_number) + 1;
    }
    const newStaff = new Staff({
      staffName,
      staffPhoto: req.files['photoFile'][0].filename,
      staffCV: req.files['cvFile'][0].filename,
      staff_number,
    });

    await newStaff.save();

    await res.status(201).json({
      staff: newStaff._id,
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find({});
    res.send({ data: staff, status: 'success' });
  } catch (error) {
    res.send({ data: [], status: 'fail' });
  }
};

const updateStaff = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'Data to be updated cannot be empty.' });
  }

  const id = req.body.id;

  Staff.findByIdAndUpdate(id, req.body, { new: true })
    .then(async (data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update staff with the id of ${id}. Maybe staff not found.`,
          status: 'fail',
        });
      } else {
        if (req.files && req.files['photoFile']) {
          const newPhotoFileName = req.files['photoFile'][0].filename;
          data.staffPhoto = newPhotoFileName;
        }

        if (req.files && req.files['cvFile']) {
          const newCVFileName = req.files['cvFile'][0].filename;
          data.staffCV = newCVFileName;
        }

        await data.save();
        res.send({ data, status: 'success' });
      }
    })
    .catch((error) => {
      console.error('Error updating staff information:', error);
      res.status(500).send({
        message: 'Error updating staff information',
        status: 'fail',
      });
    });
};

const deleteStaff = async (req, res) => {
  const id = req.body.id;

  Staff.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete with id: ${id}. Maybe the ID is wrong`,
          status: 'fail',
        });
      } else {
        res.status(200).send({
          message: 'Staff was deleted successfully!',
          status: 'success',
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Could not delete staff with id: ${id}`,
        status: 'fail',
      });
    });
};

module.exports = { registerStaff, getStaff, updateStaff, deleteStaff };
