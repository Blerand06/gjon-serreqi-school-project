const express = require('express');
const router = express.Router();
const controller = require('../controller/subjectsController');
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
  '/register-subjects',
  upload.single('iconImage'),
  controller.registerSubject
);
router.get('/get-subjects', controller.getSubject);
router.put(
  '/update-subjects',
  upload.single('iconImage'),
  controller.updateSubject
);
router.delete('/delete-subjects', controller.deleteSubject);

module.exports = router;
