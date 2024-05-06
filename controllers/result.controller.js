const resultService = require('../services/result.service');

module.exports = {
    getResultsByUserId: async (req,res) => {
        try {
            const results = await resultService.getResultsByUserId(req.body); 
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
            const contentString = JSON.stringify(req.body.content);
            
            const result = await resultService.updateResult({
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
    hi: async (req,res) => {
        res.status(200).json({
            message: "hi"
        });
    }
}