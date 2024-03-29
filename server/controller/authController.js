const User = require('../models/authModel');
const jwt = require('jsonwebtoken');

const maxAge = 10 * 30 * 24 * 60;
const createToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    'Secret Token',
    {
      expiresIn: maxAge,
    }
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: 'success' });
  } catch (error) {
    res.status(401).json({
      status: 'failure',
      error: 'Incorrect Email or Password. Try again!',
    });
  }
};

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json({ user: user._id, status: 'success' });
  } catch (error) {
    // console.error(error.errors);
    res.status(500).json({
      status: 'failure',
      message:
        error.message ||
        'Some error occurred while creating a create operation!',
    });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: 'failure',
      error: 'There has been a problem with logging out!',
    });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Data to update cannot be empty!' });
  }

  const id = req.body.id;
  const password = req.body.password;
  delete req.body.password;

  User.findByIdAndUpdate(id, req.body, { new: true })
    .then(async (data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update user with ${id}. Maybe user not found.`,
        });
      } else {
        if (password) {
          data.password = password;
          await data.save();
        }
        res.send({ data, status: 'success' });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: 'Error Update User Information', status: 'fail' });
    });
};

// Role restrictions
const restrict = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.render('include/_restriction');
    }
    next();
  };
};

module.exports = { login, register, logout, restrict, update };
