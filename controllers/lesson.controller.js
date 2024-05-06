const lessonService = require('../services/lesson.service');
module.exports = {
    createLesson: async (req, res) => {
        try {
            const result = await lessonService.createLesson(req, res);
            res.status(200).json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },
}
