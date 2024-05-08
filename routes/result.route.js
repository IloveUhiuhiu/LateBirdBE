const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result.controller");

router.get("/information/:userId", resultController.getResultsByUserId);
router.post("/create", resultController.createResult);
router.put("/update/:resultId", resultController.updateResult);
router.get("/statisticLesson/:userId/:lessonId",resultController.getStatisticLesson);
router.get("/statistic/:userId",resultController.getStatistic);
router.get("/countUser/:lessonId",resultController.countUserByLesson);
router.get("/countLesson/:topicId",resultController.countLessonofTopic);
module.exports = router;