const fs = require('fs');
const { Op } = require('sequelize');
const { Topic, Result, Lesson, Photo } = require('../models');
const { STATUS_CODES } = require('http');
const { where } = require('sequelize');
const resultService = require('./result.service');
module.exports = {
    getAllLesson: async (userID,lessonTitle = "", sortBy = "asc") => {
        try {
            // Lấy tất cả các Lesson
            if (!userID) {
                throw new Error(`Unauthorized`);
            }
            const lessons = await Lesson.findAll({
                where: {
                    word: {
                        [Op.like]: `%${lessonTitle}%`
                    }
                },
                include: [{
                    model: Photo,
                    as: 'photos',
                    attributes: ['photoId', 'linkPhoto'] // Chỉ lấy các thuộc tính cần thiết
                }]
            });
            if (!lessons) {
                throw new Error(`Lessons with topic ID ${topicId} not found`);
            }
            if (sortBy === "desc") {
                lessons.sort((a, b) => b.word.localeCompare(a.word));
            }
            else {
                lessons.sort((a, b) => a.word.localeCompare(b.word));
            }
            const result = await Promise.all(lessons.map(async (lesson) => {
                try {
                    const count = await resultService.countUserByLesson(lesson.lessonId);
                    const LearnedPeople = count.countUser;
                    const topic = await Topic.findByPk(lesson.topicId);
                    const topicName = topic?.nameTopic ?? "";
                    const getStatisticLesson = await resultService.getStatisticLesson(lesson.lessonId, userID);
                    const studiedTimes = getStatisticLesson.count;
                    const maxScore = getStatisticLesson.content;
                    return { ...lesson.toJSON(),topicName, LearnedPeople,studiedTimes,maxScore };
                } catch (error) {
                    throw new Error(`Error processing lesson: ${error.message}`);
                }
            }));
            return result;
        } catch (error) {
            throw new Error(`Error fetching lessons: ${error.message}`);
        }
    },
    getAllLessonByTopicId: async (topicId) => {
        try {
            const topic = await Topic.findByPk(topicId);
            if (!topic) {
                throw new Error(`Topic not found`);
            }
            //đếm số lượng người học topic
            const lessons = await Lesson.findAll({
                where: { topicId },
                include: [{
                    model: Photo,
                    as: 'photos',
                    attributes: ['photoId', 'linkPhoto']
                }]
            });
            if (!lessons) {
                throw new Error(`Lessons not found`);
            }
            const results = await Result.findAll();
            if (!results) {
                throw new Error(`Results not found`);
            }
            const uniqueUserIds = new Set();
            for (const lesson of lessons) {
                results.forEach(result => {
                    if (result.lessonId === lesson.lessonId) uniqueUserIds.add(result.userId);
                });
            };


            return {

                count: lessons.length,
                nameTopic: topic.nameTopic,
                countUser: uniqueUserIds.size,
                lessons: lessons

            };
        } catch (error) {
            throw new Error(`Error fetching lessons by topic ID: ${error.message}`);
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
                throw new Error(`Lesson with ID ${lessonId} not found`, STATUS_CODES.NOT_FOUND);
            }
            // Trả về Lesson được tìm thấy
            return lesson;
        } catch (error) {
            throw new Error(`Error fetching lesson by ID: ${error.message}`);
        }
    },
    createLesson: async (req, res) => {
        const { word, linkVideo1, linkVideo2, topicId } = req.body;
        const images = req.files;

        // Tiến hành lưu các tệp ảnh vào thư mục img trên máy chủ
        const imgPaths = [];
        images.forEach((image, index) => {
            const imgPath = `uploads/${image.originalname}`;
            fs.renameSync(image.path, imgPath);
            imgPaths.push("http://localhost:3007/" + imgPath);
        });

        try {
            // Tạo bài học mới trong cơ sở dữ liệu
            const lesson = await Lesson.create({ word, linkVideo1, linkVideo2, topicId });

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
    //update lesson
    updateLesson: async (lessonId, newLesson, images) => {
        const { word, linkVideo1, linkVideo2, topicId } = newLesson;

        // Tiến hành lưu các tệp ảnh vào thư mục img trên máy chủ
        const imgPaths = [];
        images.forEach((image, index) => {
            const imgPath = `uploads/${image.originalname}`;
            fs.renameSync(image.path, imgPath);
            imgPaths.push("http://localhost:3007/" + imgPath);
        });

        try {
            // Tìm bài học theo lessonId
            const lesson = await Lesson.findByPk(lessonId);
            if (!lesson) {
                throw new Error(`Lesson with ID ${lessonId} not found`, STATUS_CODES.NOT_FOUND);
            }
            // Cập nhật thông tin bài học
            lesson.word = word;
            lesson.linkVideo1 = linkVideo1;
            lesson.linkVideo2 = linkVideo2;
            lesson.topicId = topicId;
            await lesson.save();
            // Lưu các đường dẫn ảnh vào cơ sở dữ liệu
            const photoPromises = imgPaths.map(imgPath => {
                return Photo.create({ lessonId: lesson.lessonId, linkPhoto: imgPath });
            });

            await Promise.all(photoPromises);

            return { message: 'Lesson updated successfully.' };
        } catch (error) {
            throw new Error({ error: 'Internal server error' }, STATUS_CODES.INTERNAL_SERVER_ERROR);
        }
    },
    //delete lesson
    deleteLesson: async (lessonId) => {
        try {
            // Tìm bài học theo lessonId
            const lesson = await Lesson.findByPk(lessonId);
            if (!lesson) {
                throw new Error(`Lesson with ID ${lessonId} not found`, STATUS_CODES.NOT_FOUND);
            }
            // Xóa bài học
            await lesson.destroy();
            return { message: 'Lesson deleted successfully.' };
        } catch (error) {
            throw new Error(`Error deleting lesson: ${error.message}`);
        }
    }

}