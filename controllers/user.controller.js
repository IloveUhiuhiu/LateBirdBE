const userService = require("../services/user.service");
const jwtService = require("../services/jwt.service");
const resultService = require("../services/result.service");
module.exports = {
    login: async (req, res) => {
        try {
            const result = await userService.login(req.body);
            // Check if the result contains an error property
            if (result.error) {
                res.status(result.statusCode || 500).json({
                    error: result.message,
                });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },
    getResultsByUserId: async (req, res) => {
        try {
            let userId = req.params.userId;
            if (!userId) {
                userId = jwtService.decodeToken(
                    req.headers.authorization.substring(7)
                ).userId;
            }
            const results = await resultService.getResultsByUserId(userId);
            res.status(200).json(results);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },
    register: async (req, res) => {
        try {
            const result = await userService.register(req.body);

            // Check if the result contains an error property
            if (result.error) {
                res.status(result.statusCode || 500).json({
                    error: result.message,
                });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },
    getInformation: async (req, res) => {
        try {
            console.log("userId:", req.body);
            console.log('Authorization header:', req.headers.authorization);
            const result = await userService.getUserById(
                
                jwtService.decodeToken(req.headers.authorization.substring(7))
                    .userId
            );
            res.status(200).json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message});
        }
    },
    hi: async (req, res) => {
        res.status(200).json({ message: "Hi" });
    },
};