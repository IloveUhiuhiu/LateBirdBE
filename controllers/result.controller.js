const resultService = require('../services/result.service');

module.exports = {
    getResultsByUserId: async (req,res) => {
        try {
            let userId = req.params.userId;

            const results = await resultService.getResultsByUserId(userId, req.body); 
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
    createResult: async (req, res) => {
        try {
            const contentString = JSON.stringify(req.body.content);
            const result = await resultService.createResult({
                ...req.body,
                content: contentString // Gán chuỗi JSON vào trường content
            });
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
    updateResult: async (req, res) => {
        try {
            let resultId = req.params.resultId;
            const contentString = JSON.stringify(req.body.content);
            
            const result = await resultService.updateResult(resultId,{
                ...req.body,
                content: contentString // Gán chuỗi JSON vào trường content
            });
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
    countLessonofTopic: async (req,res) => {
        try {
            let topicId = req.params.topicId;
            const result = await resultService.countLessonofTopic(topicId);
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
    countUserByLesson: async (req,res) => {
        try {
            let lessonId = req.params.lessonId;
            const result = await resultService.countUserByLesson(lessonId);
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
    getStatisticLesson: async(req,res) => {
        try {
            let userId = req.params.userId;
            let lessonId = req.params.lessonId;
            const result = await resultService.getStatisticLesson(lessonId,userId);
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
    getStatistic: async (req,res) => {
        try {
            let userId = req.params.userId;
            const result = await resultService.getStatistic(userId);
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
    }  
    
}