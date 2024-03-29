const express = require('express');
const router = express.Router();
const controller = require('../controller/subjectsController');

router.post('/register-subjects', controller.registerSubject);
router.get('/get-subjects', controller.getSubject);
router.put('/update-subjects', controller.updateSubject);
router.delete('/delete-subjects', controller.deleteSubject);

module.exports = router;
