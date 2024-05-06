const fs = require('fs');
const { Lesson, Photo } = require('../models');

module.exports = {
    getAllLesson: async () => {
        try {
            // Lấy tất cả các Lesson
            const lessons = await Lesson.findAll({
                include: [{
                    model: Photo,
                    as: 'photos',
                    attributes: ['photoId', 'linkPhoto'] // Chỉ lấy các thuộc tính cần thiết
                }]
            });

            // Trả về danh sách các Lesson
            return lessons;
        } catch (error) {
            throw new Error(`Error fetching lessons: ${error.message}`);
        }
    },

    getLessonById: async (lessonId) => {
        try {
            // Tìm Lesson theo lessonId
            const lesson = await Lesson.findByPk(lessonId, {
                include: [{
                    model: Photo,
                    as: 'photos',
                    attributes: ['photoId', 'linkPhoto']
                }]
            });


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
        createLesson: async (req, res) => {
            const { word, linkVideo, topicId } = req.body;
            const images = req.files;

            // Tiến hành lưu các tệp ảnh vào thư mục img trên máy chủ
            const imgPaths = [];
            images.forEach((image, index) => {
                const imgPath = `uploads/${image.originalname}`;
                fs.renameSync(image.path, imgPath);
                imgPaths.push("http://localhost:3007/"+imgPath);
            });

            try {
                // Tạo bài học mới trong cơ sở dữ liệu
                const lesson = await Lesson.create({ word, linkVideo, topicId });

                // Lưu các đường dẫn ảnh vào cơ sở dữ liệu
                const photoPromises = imgPaths.map(imgPath => {
                    return Photo.create({ lessonId: lesson.lessonId, linkPhoto: imgPath });
                });

                await Promise.all(photoPromises);

                res.status(200).json({ message: 'Lesson created successfully.' });
            } catch (error) {
                console.error('Error creating lesson:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        },

}