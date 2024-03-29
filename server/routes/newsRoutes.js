const express = require('express');
const router = express.Router();
const controller = require('../controller/newsController');

router.post('/register-news', controller.registerNews);
router.get('/get-news', controller.getNews);
router.put('/update-news', controller.updateNews);
router.delete('/delete-news', controller.deleteNews);

module.exports = router;
