const express = require('express');
const router = express.Router();
const controller = require('../controller/planController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, (__dirname, 'server/uploads'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  '/register-plan',
  upload.single('planPhotoFile'),
  controller.registerPlan
);
router.get('/get-plan', controller.getPlan);
router.put('/update-plan', controller.updatePlan);
router.delete('/delete-plan', controller.deletePlan);

module.exports = router;
