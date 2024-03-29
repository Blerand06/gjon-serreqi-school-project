const express = require('express');
const router = express.Router();
const controller = require('../controller/planController');

router.post('/register-plan', controller.registerPlan);
router.get('/get-plan', controller.getPlan);
router.put('/update-plan', controller.updatePlan);
router.delete('/delete-plan', controller.deletePlan);

module.exports = router;
