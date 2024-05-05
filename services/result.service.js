const {Result, User, Lesson} = require('../models');

module.exports = {
    getAllResultByUserId: async (userId) => {
        try {
            
            const results = await Result.findAll({
                where: {
                    userId: userId
                },
                include: {
                    model: Lesson,
                    as: 'lesson', 
                    attributes: ['lessonId', 'word', 'linkVideo'] 
                },
                attributes: ['content'], 
            });

            
            const lessonsWithContent = results.map(result => ({
                lesson: result.lesson, 
                content: result.content 
            }));

           
            return lessonsWithContent;
        } catch (error) {
            throw new Error(`Error fetching lessons by user ID ${userId}: ${error.message}`);
        }
    },
    createResult: async (userId,lessonId, content) => {
        try {
            const result = Result.create({
                userId: userId,
                lessonId: lessonId,
                content: content
            });
            // Kiểm tra result có được tạo thành công không
            if (!result) {
                throw new Error("Failed to create result");
            }
            return result;
        }catch (error) {
            throw new Error(`Error creating result: ${error.message}`);
        }
    }
}