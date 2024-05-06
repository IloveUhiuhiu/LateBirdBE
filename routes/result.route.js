const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result.controller");

router.get("/hi", resultController.hi);
router.get("/information", resultController.getResultsByUserId);
router.post("/create", resultController.createResult);
router.post("/update", resultController.updateResult);
module.exports = router;