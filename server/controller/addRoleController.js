const Role = require('../models/addRoleModel');
const Subject = require('../models/subjectsModel');

const registerRole = async (req, res) => {
  const { roleName } = req.body;

  try {
    let role_number = 1;
    const roleOnDb = await Role.findOne()
      .sort({ createdAt: -1 })
      .select('role_number');
    if (roleOnDb) {
      role_number = parseInt(roleOnDb.role_number) + 1;
    }

    const newRole = new Role({
      roleName,
      role_number,
    });

    await newRole.save();

    await res.status(201).json({
      role: newRole._id,
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getRole = async (req, res) => {
  try {
    const role = await Role.find({});
    res.send({ data: role, status: 'success' });
  } catch (error) {
    console.log(error);
    res.send({ data: [], status: 'fail' });
  }
};

const deleteRole = async (req, res) => {
  const id = req.body.id;

  Role.findByIdAndDelete(id)
    .then(async (data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Delete with id: ${id}. Maybe the ID is wrong`,
          status: 'fail',
        });
      } else {
        res.status(200).send({
          message: 'Role was deleted successfully!',
          status: 'success',
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: `Could not delete role with id: ${id}`,
        status: 'fail',
      });
    });
};

module.exports = { registerRole, getRole, deleteRole };
