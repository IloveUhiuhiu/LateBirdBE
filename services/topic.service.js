
const { loadEnvFile } = require('process');
const { Result, Topic, Lesson } = require('../models');
const lessonService = require('../services/lesson.service');
const { Op } = require('sequelize');

module.exports = {
    getAllTopic: async (topicName = "", sortBy = "asc") => {
        try {
            // Lấy danh sách các topic và bài học kèm theo
            const topics = await Topic.findAll({
                where: {
                    nameTopic: {
                        [Op.like]: `%${topicName}%`
                    }
                },
                include: [{
                    model: Lesson,
                    as: 'lessons',
                }]
            });

            // Lập qua từng topic và thực hiện đếm số lượng userID duy nhất
            const topicResults = await Promise.all(topics.map(async (topic) => {
                const lessonIDs = topic.lessons.map(lesson => lesson.lessonId);
                await Promise.all(lessonIDs);
                const uniqueUserCount = await Result.count({
                    distinct: true,
                    col: 'userId',
                    where: {
                        lessonId: lessonIDs
                    }
                });
                return {
                    topicId: topic.topicId,
                    topicName: topic.nameTopic,
                    linkPhoto: topic.linkPhoto,
                    lessons:topic.lessons,
                    numberOfLessons: lessonIDs.length,
                    numberOfLearnedUsers: uniqueUserCount
                };
            }));

            return topicResults;
        } catch (error) {
            throw new Error(`Error fetching all topic: ${error.message}`);
        }
    },
    getAllTopicByUserId: async (userId, topicName = "", sortBy = "asc") => { 
        try {
        const allLesson = await lessonService.getAllLesson(userId);
        const studiedLessons = allLesson.filter(lesson => lesson.studiedTimes > 0);
        const topicIds = studiedLessons.map(lesson => lesson.topicId);
        const uniqueTopicIds = [...new Set(topicIds)];
        const topics = await Topic.findAll({
            where: {
                topicId: uniqueTopicIds,
                nameTopic: {
                    [Op.like]: `%${topicName}%`
                }
            },
            include: [{
                model: Lesson,
                as: 'lessons',
            }]
        });
        if (!topics) {
            throw new Error(`Topic not found`);
        }
        if (sortBy === "desc") {
            topics.sort((a, b) => b.nameTopic.localeCompare(a.nameTopic));
        }
        else {
            topics.sort((a, b) => a.nameTopic.localeCompare(b.nameTopic));
        }
        return topics;
    } catch(error) {
        throw new Error(`Error fetching topics: ${error.message}`);
    }
    },

    getTopicById: async (topicId) => {
        try {

            const topic = await Topic.findByPk(topicId);

            return topic;
        } catch (error) {
            throw new Error(`Error fetching topic by id: ${error.message}`);
        }
    },
    createTopic: async (data) => {
        try {
            const existingTopic = await Topic.findOne({
                where: {
                    nameTopic: data.nameTopic

                }
            });
            if (existingTopic) {
                return Promise.reject({
                    message: "nameTopic already exists",
                    statusCode: 400,
                });
            }
            const topic = Topic.create({
                nameTopic: data.nameTopic,
                linkPhoto: data.linkPhoto
            });
            const result = {
                message: "Topic created",
                topic: {
                    topicId: topic.topicId,
                    nameTopic: topic.nameTopic,
                    linkPhoto: topic.linkPhoto
                },
            };

            return result;
        } catch (error) {
            throw new Error(`Error creating topic: ${error.message}`);
        }

    },
    updateTopic: async (topicId, data) => {
        try {
            const topic = await Topic.findByPk(topicId);
            if (!topic) {
                throw new Error(`Topic with ID ${topicId} not found`);
            }

            // Update các thuộc tính của topic với data
            await topic.update(data);

            const updatedTopic = await Topic.findByPk(topicId);
            return updatedTopic;
        } catch (error) {
            throw new Error(`Error updating topic: ${error.message}`);
        }
    }
}