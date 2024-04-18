const express = require('express');
const router = express.Router();
const controller = require('../controller/staffController');
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
  '/register-staff',
  upload.fields([
    { name: 'photoFile', maxCount: 1 },
    { name: 'cvFile', maxCount: 1 },
  ]),
  controller.registerStaff
);
router.get('/get-staff', controller.getStaff);
router.put(
  '/update-staff',
  upload.fields([
    { name: 'photoFile', maxCount: 1 },
    { name: 'cvFile', maxCount: 1 },
  ]),
  controller.updateStaff
);
router.delete('/delete-staff', controller.deleteStaff);

module.exports = router;
