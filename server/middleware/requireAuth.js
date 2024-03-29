const jwt = require('jsonwebtoken');
const User = require('../models/authModel');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'Secret Token', async (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        res.redirect('/login');
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) {
          req.user = user;
          res.locals.user = user;
          next();
        }
        if (!user) {
          req.user = null;
          res.redirect('/login');
        }
      }
    });
  } else {
    req.user = null;
    res.redirect('/login');
  }
};

module.exports = { requireAuth };
