const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic.controller");

router.get("/information/:topicId", topicController.getTopicById);
router.get("/allInformation",topicController.getAllTopic);
router.post("/create", topicController.createTopic);
router.put("/update/:topicId", topicController.updateTopic);
module.exports = router;