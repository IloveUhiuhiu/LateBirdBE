const express = require("express");
const router = express.Router();
const topicController = require("../controllers/topic.controller");

router.get("/hi", topicController.hi);
router.get("/information", topicController.getTopicById);
router.get("/allinformation",topicController.getAllTopic);
router.post("/create", topicController.createTopic);
router.post("/update", topicController.updateTopic);
module.exports = router;