const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result.controller");


router.get("/information/:userId", resultController.getResultsByUserId);
router.post("/create", resultController.createResult);
router.put("/update/:resultId", resultController.updateResult);
module.exports = router;