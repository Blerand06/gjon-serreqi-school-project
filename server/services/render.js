const News = require('../models/newsModel');
const Subject = require('../models/subjectsModel');
const Staff = require('../models/staffModel');
const Plan = require('../models/planModel');
const User = require('../models/authModel');

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
const staffPage = (req, res) => {
  res.render('staff');
};
const aboutPage = async (req, res) => {
  const about = await Plan.find();
  res.render('about', { about });
};
const loginPage = (req, res) => {
  res.render('login');
};
const newsPage = (req, res) => {
  res.render('news');
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
const adminStaffPage = (req, res) => {
  res.render('admin/admin-staff');
};
const adminSubjectsPage = async (req, res) => {
  try {
    const subject = req.subject;
    res.render('admin/admin-subjects', { subject });
  } catch (error) {
    res.redirect('back');
  }
};
const adminContactPage = async (req, res) => {
  res.render('admin/admin-contact');
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
    res.render('admin/admin-staff-edit', { staff });
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

  // PRIVATE/ADMIN - EDITS exporting
  adminAuthPageEdit,
  adminNewsPageEdit,
  adminPlanPageEdit,
  adminStaffPageEdit,
  adminSubjectsPageEdit,
};
