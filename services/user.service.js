const {User} = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (data) => {
        try {
            const user = await User.findOne({
                where: {
                    username: data.username,
                    hashedPassword: data.hashedPassword,
                }
            });

            if (!user) {
                return Promise.reject({
                    message: "Auth failed",
                    statusCode: 401,
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
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
            console.log(token);
            const result = {
                message: "Auth successful",
                token: token,
            };
            
            return result;
            
        } catch (error) {
            console.log(error);
            return Promise.reject({
                message: "Internal Server Error",
                statusCode: 500,
            });
        }
    },
    register: async (data) => {
        try {
            const user = await User.create({
                username: data.username,
                hashedPassword: data.hashedPassword,
                fullname: data.fullname,
                birthday: data.birthday,
                avatar: data.avatar,
            });
            const result = {
                message: "User created",
                user: {
                    id: user.id,
                    username: user.username,
                    fullname: user.fullname,
                    birthday: user.birthday,
                    avatar: user.avatar,
                },
            };

            return result;
        } catch (error) {
            return Promise.reject({
                message: "Internal Server Error",
                statusCode: 500,
            });
        }

    },
    getUserById: async (id) => {
        try{
            const user = await User.findByPk(id, {
                attributes: [
                    "id",
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
                id: user.id,
                fullname: user.fullname,
                createdAt: user.createdAt,
                birthday: user.birthday,
                avatar: user.avatar,
                
            };
            return result;
        } catch (error)
        {
            return Promise.reject({
                message: "Internal Server Error",
                statusCode: 500,
            });
        }
    },
    getAllUser: async () => {
        try {
            const users = await User.findAll({
                attributes: [
                    "id",
                    "fullname",
                    "avatar",
                ]
            })
        } catch(error) {
            return Promise.reject({
                message: "Internal Server Error",
                statusCode: 500,
            });
        }
    },

}