'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// init Data
// async function initData() {
//     // destroy all data
//     await db.PostSave.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.NotificationComment.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.NotificationPost.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.ReportComment.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.ReportPost.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.CommentVote.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.PostVote.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.VoteType.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.LectureEvent.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.Lecture.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.Follow.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.Comment.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.PostEvent.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.Post.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.UserRole.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.Post.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.Role.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.User.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.EventCategory.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.Event.destroy({
//         where: {},
//         truncate: false,
//     });

//     await db.Category.destroy({
//         where: {},
//         truncate: false,
//     });

//     // init data
//     await db.Category.initData();
//     await db.Event.initData();
//     await db.EventCategory.initData();
//     await db.User.initData();
//     await db.Role.initData();
//     await db.UserRole.initData();
//     await db.Post.initData();
//     await db.PostEvent.initData();
//     await db.Comment.initData();
//     await db.Follow.initData();
//     await db.Lecture.initData();
//     await db.LectureEvent.initData();
//     await db.VoteType.initData();
//     await db.PostVote.initData();
//     await db.CommentVote.initData();
//     await db.ReportPost.initData();
//     await db.ReportComment.initData();
//     await db.NotificationPost.initData();
//     await db.NotificationComment.initData();
//     await db.PostSave.initData();
// }

//Connect to the database and then call initData

db.sequelize = sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection established successfully.');
        return sequelize.sync({ force: false});
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

db.Sequelize = Sequelize;

module.exports = db;