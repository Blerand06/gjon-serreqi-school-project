const express = require('express');
const router = express.Router();
const controller = require('../controller/contactController');

router.post('/register-contact', controller.registerContact);
router.get('/get-contact', controller.getContact);
router.delete('/delete-contact', controller.deleteContact);

module.exports = router;
