const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    login: async (data) => {
        try {
            const user = await User.findOne({
                where: {
                    username: data.username,
                }
            });

            if (!user) {
                return Promise.reject({
                    message: "user not found",
                    statusCode: 401,
                });
            }

            const isPasswordValid = await bcrypt.compare(data.password, user.hashedPassword);
            if (!isPasswordValid) {
                return Promise.reject({
                    message: "Password is incorrect",
                    statusCode: 401,
                });
            }

            const token = jwt.sign(
                {
                    userId: user.userId,
                    username: user.username,
                    fullname: user.fullname,
                    createdAt: user.createdAt,
                    birthday: user.birthday,
                    avatar: user.avatar,
                },
                "secret",
                {
                    expiresIn: "24h",
                }
            );

            const result = {
                message: "Auth successful",
                token: token,
            };

            return result;
        } catch (error) {
            console.log(error);
            return Promise.reject({
                error: error.message,
                statusCode: 500,
            });
        }
    },
    register: async (data) => {
        try {
            // Kiểm tra xem username đã tồn tại trong cơ sở dữ liệu hay chưa
            const existingUser = await User.findOne({
                where: {
                    username: data.username
                }
            });
            if (existingUser) {
                return Promise.reject({
                    message: "Username already exists",
                    statusCode: 400,
                });
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await User.create({
                username: data.username,
                hashedPassword: hashedPassword,
                fullname: data.fullname,
                birthday: data.birthday,
                avatar: data.avatar,
            });

            const result = {
                message: "User created",
                user: {
                    userId: user.userId,
                    username: user.username,
                    fullname: user.fullname,
                    birthday: user.birthday,
                    avatar: user.avatar,
                },
            };

            return result;
        } catch (error) {
            return Promise.reject({
                message: error.message,
                statusCode: 500,
            });
        }
    }

,
    getUserById: async (userId) => {
        try{
            const user = await User.findByPk(userId, {
                attributes: [
                    "userId",
                    "fullname",
                    "createdAt",
                    "birthday",
                    "avatar",
                ],
            });

            if (!user) {
                return Promise.reject({
                    message: "User not found",
                    statusCode: 404,
                });
            }
            const result = {
                userId: user.userId,
                fullname: user.fullname,
                createdAt: user.createdAt,
                birthday: user.birthday,
                avatar: user.avatar,
                
            };
            return result;
        } catch (error)
        {
            return Promise.reject({
                message: error.message + 'kaka',
                statusCode: 500,
            });
        }
    },
    getAllUser: async () => {
        try {
            const users = await User.findAll({
                attributes: [
                    "userId",
                    "fullname",
                    "avatar",
                ]
            });
            return users;
        } catch(error) {
            return Promise.reject({
                message: error.message,
                statusCode: 500,
            });
        }
    },

}