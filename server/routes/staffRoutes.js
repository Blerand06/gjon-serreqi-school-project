const express = require('express');
const router = express.Router();
const controller = require('../controller/staffController');

router.post('/register-staff', controller.registerStaff);
router.get('/get-staff', controller.getStaff);
router.put('/update-staff', controller.updateStaff);
router.delete('/delete-staff', controller.deleteStaff);

module.exports = router;
