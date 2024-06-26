const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result.controller");

router.get("/information", resultController.getResultsByUserId);
router.post("/create", resultController.createResult);
router.put("/update/:resultId", resultController.updateResult);
router.get("/statisticLesson/:lessonId",resultController.getStatisticLesson);
router.get("/statistic",resultController.getStatistic);
router.get("/countUser/:lessonId",resultController.countUserByLesson);

module.exports = router;