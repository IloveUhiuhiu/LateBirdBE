'use strict';

const path = require('path');
const tedious = require('tedious');
const { Sequelize, DataTypes } = require('sequelize');

const { dbName, dbConfig } = require(__dirname + '/../config/database.json');

const db = {};

initialize();

async function initialize() {
    const dialect = 'mssql';
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;

    // create db if it doesn't already exist
    await ensureDbExists(dbName);

    // connect to db
    const sequelize = new Sequelize(dbName, userName, password, { host, dialect });

    // init models and add them to the exported db object
    db.User = require('./user.model.js')(sequelize,DataTypes);
    db.Photo = require('./photo.model.js')(sequelize,DataTypes);
    db.Lesson = require('./lesson.model.js')(sequelize,DataTypes);
    db.Topic = require('./topic.model.js')(sequelize,DataTypes);
    db.Result = require('./result.model.js')(sequelize,DataTypes);
    db.User.associate(db);
    db.Photo.associate(db);
    db.Lesson.associate(db);
    db.Topic.associate(db);
    db.Result.associate(db);
    // sync all models with database
    await sequelize.sync({ force: false });
}

async function ensureDbExists(dbName) {
    return new Promise((resolve, reject) => {
        const connection = new tedious.Connection(dbConfig);
        connection.connect((err) => {
            if (err) {
                console.error(err);
                reject(`Connection Failed: ${err.message}`);
            }

            const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
            const request = new tedious.Request(createDbQuery, (err) => {
                if (err) {
                    console.error(err);
                    reject(`Create DB Query Failed: ${err.message}`);
                }

                // query executed successfully
                resolve();
            });

            connection.execSql(request);
        });
    });
}

module.exports = db;