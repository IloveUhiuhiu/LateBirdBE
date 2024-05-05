require("dotenv").config();
const express = require("express");
const cors = require('cors');
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
const lessonRoutes = require("./routes/lesson.route");
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/users", userRoutes);
app.use("/api/lesson", lessonRoutes);
app.get("/", (req, res, next) => {
    res.send("Server is running ...");
});
const PORT = process.env.PORT || 3007; // Sử dụng cổng được xác định trong biến môi trường hoặc mặc định là 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;