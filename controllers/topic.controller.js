const { get } = require('../routes/lesson.route');
const topicService = require('../services/topic.service');
const jwtService = require("../services/jwt.service");
module.exports = {
    getAllTopic: async (req, res) => {
        const topicName = req.query.topicName;
        const sortBy = req.query.sortBy;
        try {

            const results = await topicService.getAllTopic(topicName, sortBy); 
            if (results.error) {
                res.status(results.statusCode || 500).json({
                    error: results.message
                });
            } else {
                res.status(200).json(results);
            }
        } catch (error) {
            res.status(error.statusCode || 500).json({
                error: error.message
            });
        }
        
    },
    getAllTopicByUserId: async (req, res) => { 
        try {
            const userID = jwtService.decodeToken(req.headers.authorization.substring(7))
                .userId
            const topicName = req.query.topicName;
            const sortBy = req.query.sortBy;
            const results = await topicService.getAllTopicByUserId(userID,topicName,sortBy);
            if (results.error) {
                res.status(results.statusCode || 500).json({
                    error: results.message
                });
            } else {
                res.status(200).json(results);
            }
        } catch (error) {
            res.status(error.statusCode || 500).json({
                error: error.message
            });
        }
    },
    getTopicById: async (req,res) => {
        try {
            let topicId = req.params.topicId;
            const result = await topicService.getTopicById(topicId);
            if (result.error) {
                res.status(result.statusCode || 500).json({
                    error: result.message
                });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(error.message || 500).json({
                error: error.message
            })
        }
    },
    createTopic: async (req, res) => {
        try {
            const result = await topicService.createTopic(req.body);
            if (result.error) {
                res.status(res.statusCode || 500).json({
                    error: result.message
                });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(error.statusCode ||500).json({
                error: error.message
            });
        }   
        
    },
    updateTopic: async (req, res) => {
        try {
            let topicId = req.params.topicId;
            const result = await topicService.updateTopic(topicId,req.body);
            if (result.error) {
                res.status(res.statusCode || 500).json({
                    error: result.message
                });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(error.statusCode ||500).json({
                error: error.message
            });
        }   
        
    },
  
}