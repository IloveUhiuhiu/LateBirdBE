const {Photo} = require("../models/photo.model");
const {Lesson} = require("../models/lesson.model");

module.exports = {
    getPhotoByLessonId: async (lessonId) => {
        try {
            const photos = await Photo.findAll({
                where: {
                    lessonId: lessonId,
                },   
            });
            return photos;
        } catch (error) {
            throw new Error(`Error fetching photo by id: ${error.message}`);
        }    
    },

    createPhoto: async (lessonId,linkPhoto) => {
        try {
            const photo = await Photo.create({
                lessonId: lessonId,
                linkPhoto: linkPhoto,
            });
            return photo;
        } catch (error) {
            throw new Error(`Error creating photo: ${error.message}`);
        }
    },
}