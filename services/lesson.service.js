const {Lesson,Photo} = require("../models");

module.exports = {
    getAllLesson: async () => {
        try {
            // Lấy tất cả các Lesson
            const lessons = await Lesson.findAll();

            // Trả về danh sách các Lesson
            return lessons;
        } catch (error) {
            throw new Error(`Error fetching lessons: ${error.message}`);
        }
    },

    getLessonById: async (lessonId) => {
        try {
            // Tìm Lesson theo lessonId
            const lesson = await Lesson.findByPk(lessonId);

            // Kiểm tra xem Lesson có tồn tại không
            if (!lesson) {
                throw new Error(`Lesson with ID ${lessonId} not found`);
            }
            // Trả về Lesson được tìm thấy
            return lesson;
        } catch (error) {
            throw new Error(`Error fetching lesson by ID: ${error.message}`);
        }
    },
    createLesson: async (word, linkPhoto, linkVideo) => {
        try {
            // Tạo lesson
            const lesson = await Lesson.create({
                word: word,
                linkVideo: linkVideo,    
            });

            // Kiểm tra lesson có được tạo thành công không
            if (!lesson) {
                throw new Error("Failed to create lesson");
            }

            // Sau khi tạo thành công lesson, gọi hàm createPhoto
            const photo = await createPhoto(lesson.id, linkPhoto);

            // Trả về lesson và photo vừa tạo
            return {
                lesson,
                photo
            };
        } catch (error) {
            throw new Error(`Error creating lesson: ${error.message}`);
        }
    },

}