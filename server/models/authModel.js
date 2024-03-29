const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Ju lutem shkruani Email-in e sakt!'],
    },
    password: {
      type: String,
      required: [true, 'Ju lutem shkruani Password-in e sakt!'],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({
    email: email,
  });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password.');
  }
  throw Error('Incorrect email.');
};

const User = mongoose.model('User', userSchema);

module.exports = User;
