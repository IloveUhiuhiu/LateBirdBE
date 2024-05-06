const express = require('express');
const upload = require('../helper/multerHelper');
const lessonController = require("../controllers/lesson.controller");

const router = express.Router();

router.post('/create', upload.array('img', 5), lessonController.createLesson);

module.exports = router;
