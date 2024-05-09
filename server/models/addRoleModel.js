const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
    },
    roleChecker: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;
