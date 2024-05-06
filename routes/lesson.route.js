const express = require('express');
const upload = require('../helper/multerHelper');
const lessonController = require("../controllers/lesson.controller");

const router = express.Router();

router.post('/create', upload.array('img', 5), lessonController.createLesson);
router.get('/get/:lessonId', lessonController.getLessonById);
router.get('/getAll', lessonController.getAllLessons);
router.get('/getAllByTopicId/:topicId', lessonController.getAllLessonByTopicId);
router.delete('/delete/:lessonId', lessonController.deleteLesson);
router.put('/update/:lessonId', lessonController.updateLesson);

module.exports = router;
