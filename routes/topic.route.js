const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic.controller");

router.get("/information", topicController.getTopicById);
router.get("/allinformation",topicController.getAllTopic);
router.post("/create", topicController.createTopic);
router.put("/update", topicController.updateTopic);
module.exports = router;