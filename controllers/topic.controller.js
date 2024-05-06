const topicService = require('../services/topic.service');

module.exports = {
    getAllTopic: async (req,res) => {
        try {
            const results = await topicService.getAllTopic(); 
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
            const result = await topicService.getTopicById(req.body);
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
            const result = await topicService.updateTopic(req.body);
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
    hi: async (req,res) => {
        res.status(200).json({
            message: "hi"
        });
    }
}