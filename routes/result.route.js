const express = require("express");
const router = express.Router();
const resultController = require("../controllers/result.controller");


router.get("/information", resultController.getResultsByUserId);
router.post("/create", resultController.createResult);
router.put("/update", resultController.updateResult);
module.exports = router;