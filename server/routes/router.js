const express = require('express');
const router = express.Router();
const services = require('../services/render');
const { requireAuth } = require('../middleware/requireAuth');

// Routing Pages (PUBLIC)
router.get('/', services.mainPage);
router.get('/about', services.aboutPage);
router.get('/contact', services.contactPage);
router.get('/login', services.loginPage);
router.get('/news', services.newsPage);
router.get('/staff', services.staffPage);

// Routing Pages (PRIVATE/ADMIN)
router.get('/admin-news', requireAuth, services.adminNewsPage);
router.get('/admin-news/:id', requireAuth, services.adminNewsPageEdit);

router.get('/admin-plan', requireAuth, services.adminPlanPage);
router.get('/admin-plan/:id', requireAuth, services.adminPlanPageEdit);

router.get('/admin-staff', requireAuth, services.adminStaffPage);
router.get('/admin-staff/:id', requireAuth, services.adminStaffPageEdit);

router.get('/admin-subjects', requireAuth, services.adminSubjectsPage);
router.get('/admin-subjects/:id', requireAuth, services.adminSubjectsPageEdit);

router.get('/admin-contact', requireAuth, services.adminContactPage);
router.get(
  '/admin-more-contact/:id',
  requireAuth,
  services.expandedAdminContactPage
);

router.get('/admin-add-role', requireAuth, services.adminAddRole);

// Routing Pages (PRIVATE/ADMIN - EDITS)
router.get('/admin-auth-edit/:id', requireAuth, services.adminAuthPageEdit);

router.get('/admin-news-edit', requireAuth, services.adminNewsPageEdit);
router.get('/admin-plan-edit', requireAuth, services.adminPlanPageEdit);
router.get('/admin-staff-edit', requireAuth, services.adminStaffPageEdit);
router.get('/admin-subjects-edit', requireAuth, services.adminSubjectsPageEdit);

module.exports = router;
