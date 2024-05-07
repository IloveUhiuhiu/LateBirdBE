
const { Lesson,Topic } = require('../models');


module.exports = {
    getAllTopic: async () => {
        try {
            const topics = await Topic.findAll(); 
            return topics;
        } catch (error) {
            throw new Error(`Error fetching all topic: ${error.message}`);
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
            });
            const result = {
                message: "Topic created",
                topic: {
                    topicId: topic.topicId,
                    nameTopic: topic.nameTopic,
                },
            };
            
            return result;
        } catch (error) {
            throw new Error(`Error creating topic: ${error.message}`);
        }   
        
    },
    updateTopic: async (topicId,data) => {
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