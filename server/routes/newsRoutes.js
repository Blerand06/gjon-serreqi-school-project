const express = require('express');
const router = express.Router();
const controller = require('../controller/newsController');
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
  '/register-news',
  upload.single('newsPhotoFile'),
  controller.registerNews
);
router.get('/get-news', controller.getNews);
router.put(
  '/update-news',
  upload.single('newsPhotoFile'),
  controller.updateNews
);
router.delete('/delete-news', controller.deleteNews);

module.exports = router;
