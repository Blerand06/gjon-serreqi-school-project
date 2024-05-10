const News = require('../models/newsModel');
const Subject = require('../models/subjectsModel');
const Staff = require('../models/staffModel');
const Plan = require('../models/planModel');
const User = require('../models/authModel');
const Contact = require('../models/contactModel');
const Role = require('../models/addRoleModel');
const moment = require('moment');

// Rendering Pages (PUBLIC)
const mainPage = async (req, res) => {
  try {
    const subject = await Subject.find();
    const staff = await Staff.find();
    res.render('index', { subject, staff });
  } catch (e) {
    res.redirect('back');
  }
};
const staffPage = async (req, res) => {
  const staff = await Staff.find();
  const staffBoard = await Staff.find({
    staffCategory: 'Bordi Shkollor',
  });
  const staffTeacher = await Staff.find({
    staffCategory: 'Arsimtar/e',
  });
  const staffElemtaryTeacher = await Staff.find({
    staffCategory: 'Mësues/e',
  });
  const staffTechnicalWorker = await Staff.find({
    staffCategory: 'Punëtor Teknik',
  });
  res.render('staff', {
    staff,
    staffBoard,
    staffElemtaryTeacher,
    staffTeacher,
    staffTechnicalWorker,
  });
};
const aboutPage = async (req, res) => {
  const about = await Plan.find();
  const subject = await Subject.find();
  const plan = await Plan.find();
  res.render('about', { about, subject, plan });
};
const loginPage = (req, res) => {
  res.render('login');
};
const newsPage = async (req, res) => {
  const news = await News.find();
  res.render('news', { news, moment });
};
const contactPage = (req, res) => {
  res.render('contact');
};

// Rendering Pages (PRIVATE/ADMIN)
const adminNewsPage = (req, res) => {
  res.render('admin/admin-news');
};
const adminPlanPage = (req, res) => {
  res.render('admin/admin-plan');
};
const adminStaffPage = async (req, res) => {
  const subject = await Subject.find();
  const role = await Role.find();
  res.render('admin/admin-staff', { subject, role });
};

//populate('role', 'roleName'); used for the adminStaffPage above

const adminSubjectsPage = async (req, res) => {
  try {
    const subject = await req.subject;
    const role = await Role.find();
    res.render('admin/admin-subjects', { subject, role });
  } catch (error) {
    res.redirect('back');
  }
};
const adminContactPage = async (req, res) => {
  res.render('admin/admin-contact');
};
const adminAddRole = async (req, res) => {
  const subject = await Subject.find();
  res.render('admin/admin-addRole', { subject });
};
const adminHelpPage = async (req, res) => {
  res.render('admin/admin-help');
};

// Rendering Pages (PRIVATE/ADMIN - EDITS)
const adminAuthPageEdit = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('admin/admin-auth-edit', { user });
  } catch (error) {
    res.redirect('back');
  }
};

const adminNewsPageEdit = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.render('admin/admin-news-edit', { news });
  } catch (error) {
    res.redirect('back');
  }
};

const adminPlanPageEdit = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    res.render('admin/admin-plan-edit', { plan });
  } catch (error) {
    res.redirect('back');
  }
};

const adminStaffPageEdit = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    const subject = await Subject.find();
    const role = await Role.find();
    res.render('admin/admin-staff-edit', { staff, subject, role });
  } catch (error) {
    res.redirect('back');
  }
};

const adminSubjectsPageEdit = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    res.render('admin/admin-subjects-edit', { subject });
  } catch (error) {
    res.redirect('back');
  }
};

const expandedAdminContactPage = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render('admin/admin-moreContact', { contact });
};

module.exports = {
  // PUBLIC exporting
  mainPage,
  staffPage,
  aboutPage,
  loginPage,
  newsPage,
  contactPage,

  // PRIVATE/ADMIN exporting
  adminNewsPage,
  adminPlanPage,
  adminStaffPage,
  adminSubjectsPage,
  adminContactPage,
  expandedAdminContactPage,
  adminAddRole,
  adminHelpPage,

  // PRIVATE/ADMIN - EDITS exporting
  adminAuthPageEdit,
  adminNewsPageEdit,
  adminPlanPageEdit,
  adminStaffPageEdit,
  adminSubjectsPageEdit,
};
