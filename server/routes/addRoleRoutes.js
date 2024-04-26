const express = require('express');
const router = express.Router();
const controller = require('../controller/addRoleController');

router.post('/register-role', controller.registerRole);
router.get('/get-role', controller.getRole);
router.delete('/delete-role', controller.deleteRole);

module.exports = router;
