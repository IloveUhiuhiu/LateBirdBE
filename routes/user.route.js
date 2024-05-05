const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.param("userId", (req, res, next, userId) => {
    req.userId = userId;
    next();
});

router.get("/results", userController.getResultsByUserId);
router.get("/information", userController.getInformation);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;