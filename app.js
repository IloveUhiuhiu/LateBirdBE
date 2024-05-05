require("dotenv").config();
const express = require("express");
const app = express();
const userMiddleware = require("./middleware/user.middleware");
const path = require('path');
const multer = require('multer');
const session = require("express-session");
const morgan = require("morgan");
app.use(morgan("dev"));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = express.Router();
const userRoutes = require("./routes/user.route");

// Session
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 },
    })
);

app.use("/api", router);
app.use("/api/users", userRoutes);

router.get("/", (req, res, next) => {
    res.send("Server is running ...");
});

module.exports = app;