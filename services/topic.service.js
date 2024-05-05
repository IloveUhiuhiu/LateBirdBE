const {Topic,Lesson} = require('../models');

module.exports = {
    getAllTopic: async () => {
        try {
            const topics = await Topic.FindAll(); 
            return topics;
        } catch (error) {
            throw new Error(`Error fetching all topic: ${error.message}`);
        }
        
    },
    getTopicById: async (topicId) => {
        try {
            const topic = await Topic.FindByPk(topicId, {
                include: [ {
                    model: Lesson,
                    as: 'lessons',
                    attributes: ['lessonId','word']
                }]
            });
            return topic;
        } catch (error) {
            throw new Error(`Error fetching topic by id: ${error.message}`);
        }
    },
    createTopic: (nameTopic) => {
        try {
            const topic = Topic.create({
                nameTopic: nameTopic,
            });
            return topic;
        } catch (error) {
            throw new Error(`Error creating topic: ${error.message}`);
        }   
        
    }
}