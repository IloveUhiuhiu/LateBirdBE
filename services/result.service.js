const {Result, Lesson, User} = require('../models');


module.exports = {
    getResultsByUserId: async (data) => {
        try {
            
            const results = await Result.findAll({
                where: {
                    userId: data.userId
                },
            });
            return results;
        } catch (error) {
            throw new Error(`Error fetching lessons by user ID ${data.userId}: ${error.message}`);
        }
    },
    createResult: async (data) => {
        try {
            const existingResult = await Result.findOne({
                where: {
                    userId: data.userId,
                    lessonId: data.lessonId
                }
            });
            if (existingResult) {
                return Promise.reject({
                    message: "Result already exists",
                    statusCode: 400,
                });
            }
            const result = Result.create({
                userId: data.userId,
                lessonId: data.lessonId,
                content: data.content
            });
            // Kiểm tra result có được tạo thành công không
            if (!result) {
                throw new Error("Failed to create result");
            }
            
            
            return result;
        }catch (error) {
            throw new Error(`Error creating result: ${error.message}`);
        }
    },
    updateResult: async (data) => {
        try {
            const result = await Result.findByPk(data.resultId);
            if (!result) {
                throw new Error(`result with ID ${data.resultId} not found`);
            }

            // Update các thuộc tính của result với data
            await result.update(data);
            
            // Kiểm tra result có được tạo thành công không
            if (!result) {
                throw new Error("Failed to create result");
            }
            return result;
        }catch (error) {
            throw new Error(`Error updating result: ${error.message}`);
        }
    }
}
