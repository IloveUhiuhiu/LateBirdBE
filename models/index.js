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
db.sequelize = sequelize
    .authenticate()
    .then(() => {
        console.log("Database connection established successfully.");
        return sequelize.sync({ force: false });
    })
    // .then(() => {
    //     console.log("Models synced successfully.");
    //     return initData();
    // })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

db.Sequelize = Sequelize;

module.exports = db;


//Connect to the database and then call initData

// async function checkAndCreateDatabase() {
//     try {
//         // Kết nối với máy chủ MySQL (không chỉ định cơ sở dữ liệu cụ thể)
//         const adminSequelize = new Sequelize({
//             host: config.host,
//             username: config.username,
//             password: config.password,
//             dialect: config.dialect,
//             port: config.port
//         });

//         // Kiểm tra cơ sở dữ liệu có tồn tại không
//         await adminSequelize.query(`CREATE DATABASE IF NOT EXISTS ${ config.database }`);

//         // Đóng kết nối admin
//         await adminSequelize.close();

//         //console.log(Database '${config.database}' checked and created if it didn't exist.);
//     } catch (err) {
//         console.error('Error checking/creating database:', err);
//         throw err;
//     }
// }

// Kiểm tra và tạo cơ sở dữ liệu nếu cần trước khi xác thực kết nối
// checkAndCreateDatabase()
//     .then(() => {
//         // Xác thực kết nối
//         return sequelize.authenticate();
//     })
//     .then(() => {
//         console.log("Database connection established successfully.");
//         // Đồng bộ hóa mô hình
//         return sequelize.sync({ force: true });
//     })
//     .catch((err) => {
//         console.error("Unable to connect to the database:", err);
//     });

// module.exports = {
//     sequelize,
//     Sequelize,
// };