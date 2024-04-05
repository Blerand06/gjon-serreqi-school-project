const express = require('express');
const router = express.Router();
const controller = require('../controller/contactController');

router.get('/get-contact', controller.getContact);

module.exports = router;
