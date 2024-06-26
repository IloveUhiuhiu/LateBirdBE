const resultService = require('../services/result.service');
const jwtService = require("../services/jwt.service");
module.exports = {
    getResultsByUserId: async (req,res) => {
        try {
            

            const results = await resultService.getResultsByUserId(
                jwtService.decodeToken(req.headers.authorization.substring(7))
                    .userId
            ); 
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
            let userId = jwtService.decodeToken(req.headers.authorization.substring(7))
                    .userId;
            const result = await resultService.createResult({
                userId: userId,
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
            let userId = jwtService.decodeToken(req.headers.authorization.substring(7)).userId;
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
            
            const result = await resultService.getStatistic(
                jwtService.decodeToken(req.headers.authorization.substring(7))
                    .userId
            );
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