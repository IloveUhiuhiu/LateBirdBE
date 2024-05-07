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
    getLessonById: async (req, res) => {
        try {
            const lessonId = req.params.lessonId;
            const result = await lessonService.getLessonById(lessonId);
            res.status(200).json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },
    getAllLessons: async (req, res) => {
        try {
            const result = await lessonService.getAllLesson();
            res.status(200).json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },
    getAllLessonByTopicId: async (req, res) => {
        try {
            const topicId = req.params.topicId;
            const result = await lessonService.getAllLessonByTopicId(topicId);
            res.status(200).json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },
    deleteLesson: async (req, res) => {
        try {
            const lessonId = req.params.lessonId;
            const result = await lessonService.deleteLesson(lessonId);
            res.status(200).json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },
    updateLesson: async (req, res) => {
        try {
            const lessonId = req.params.lessonId;
            const newLesson = req.body;
            const files = req.files;
            const result = await lessonService.updateLesson(lessonId, newLesson, files);
            res.status(200).json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },
}
