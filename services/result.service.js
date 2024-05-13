
const {Result,Lesson} = require('../models');




module.exports = {
    getResultsByUserId: async (userId) => {
        try {
            
            const results = await Result.findAll({
                where: {
                    userId: userId
                },
            });
            return results;
        } catch (error) {
            throw new Error(`Error fetching lessons by user ID ${userId}: ${error.message}`);
        }
    },
    createResult: async (data) => {
        try {
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
    updateResult: async (resultId,data) => {
        try {
            const result = await Result.findByPk(resultId);
            if (!result) {
                throw new Error(`result with ID ${resultId} not found`);
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
    },
    
    countUserByLesson: async(lessonId) => {
        try {
            const completedLessons= await Result.findAll({
                where: {
                    lessonId: lessonId
                }
            });
            const uniqueUserIds = new Set();
            completedLessons.forEach(result => {
                uniqueUserIds.add(result.userId);
            });
            //console.log(uniqueUserIds.size);
            const result = {
                "countUser" : uniqueUserIds.size
            }
            return result;
        } catch (error) {
            throw new Error(`Error count user by lesson: ${error.message}`);
        }
    },
    getStatistic: async (userId) => {
        try {
        // bài học đã học
        
        const completedLessons= await Result.findAll( {
            where: {
                userId: userId
            }
        });
        const uniqueLessonIds = new Set();
        completedLessons.forEach(lesson => {
            uniqueLessonIds.add(lesson.lessonId);
        });
        arrayLessonIds = Array.from(uniqueLessonIds);
        // bài học đạt
        //console.log(arrayLessonIds);
        const passedLessons = [];

        // bài học chưa đạt
        const failedLessons = [];

        let maxAccuracyofPass = 0;
        let maxAccuracyofFail = 0;
        arrayLessonIds.forEach(async (lessonId) => {
            const completedPractise= await Result.findAll({
                where: {
                    lessonId :lessonId,
                    userId :userId
                }
            });
            let maxContent = JSON.parse(completedPractise[0].content);

            for (const result of completedPractise) {
                const jsonContent = JSON.parse(result.content);
                if (maxContent.accuracyScore < jsonContent.accuracyScore) {
                    maxContent = jsonContent;
                } else if  (maxContent.accuracyScore ===  jsonContent.accuracyScore) {
                    if (maxContent.pronunciationScore < jsonContent.pronunciationScore) {
                        maxContent = jsonContent;
                    } else if (maxContent.pronunciationScore === jsonContent.pronunciationScore) {
                        if (maxContent.completenessScore < jsonContent.completenessScore) {
                            maxContent = jsonContent;
                        } else if (maxContent.completenessScore == jsonContent.completenessScore) {
                            if (maxContent.fluencyScore < jsonContent.fluencyScore) {
                                maxContent = jsonContent;
                            }
                        }
                    }
                
                }
            }

            
            if (maxContent.accuracyScore >= 50) {
                passedLessons.push(lessonId);
                if (maxAccuracyofPass < maxContent.accuracyScore)  maxAccuracyofPass = maxContent.accuracyScore;
            }
            else {
                failedLessons.push(lessonId);
                if (maxAccuracyofFail < maxContent.accuracyScore)  maxAccuracyofFail = maxContent.accuracyScore;
            }
            //console.log(lessonId +"," +  maxAccuracyofPass +"," + maxAccuracyofFail);
        });
        
        // accuracy max của bài học đạt
        
        
        // những chủ đề đã học
        
        const completedTopics = new Set();
        arrayLessonIds.forEach (async (lessonId) => {
            const lesso = await Lesson.findOne({
                where : {
                    lessonId: lessonId
                }
            });
           
            completedTopics.add(lesso.topicId);
        })
        
        const lessons = await Lesson.findAll();
      
        const process = arrayLessonIds.length * 100 / lessons.length;
        return {
            passedLessons: passedLessons.length,
            maxAccuracyofPass: maxAccuracyofPass,
            failedLessons: failedLessons.length,
            maxAccuracyofFail: maxAccuracyofFail,
            completedTopics: completedTopics.size,
            process: process
        }
        } catch (error) {
            throw new Error (`Error getting Statistic : ${error.message}`);
        }
    },
    getStatisticLesson: async (lessonId, userId) => {
        try {
            const completedPractises = await Result.findAll({
                where: {
                    lessonId: lessonId,
                    userId: userId
                }
            });

            const completedPractiseCount = completedPractises.length;

            if (completedPractiseCount === 0) {
                return {
                    count: completedPractiseCount,
                    content: ""
                };
            }

            let maxContent = null;

            for (const result of completedPractises) {
                try {
                    const jsonContent = JSON.parse(result.content);

                    if (!maxContent || jsonContent.accuracyScore > maxContent.accuracyScore ||
                        (jsonContent.accuracyScore === maxContent.accuracyScore && jsonContent.pronunciationScore > maxContent.pronunciationScore) ||
                        (jsonContent.accuracyScore === maxContent.accuracyScore && jsonContent.pronunciationScore === maxContent.pronunciationScore && jsonContent.completenessScore > maxContent.completenessScore) ||
                        (jsonContent.accuracyScore === maxContent.accuracyScore && jsonContent.pronunciationScore === maxContent.pronunciationScore && jsonContent.completenessScore === maxContent.completenessScore && jsonContent.fluencyScore > maxContent.fluencyScore)) {
                        maxContent = jsonContent;
                    }
                } catch (error) {
                    console.error(`Error parsing JSON from result with id ${result.resultId}: ${error.message}`);
                }
            }

            return {
                count: completedPractiseCount,
                content: maxContent || ""
            };
        } catch (error) {
            throw new Error(`Error getting Statistic By Lesson and User: ${error.message}`);
        }
    }

}
