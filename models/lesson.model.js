'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Lesson extends Model {
        static associate(models) {
            Lesson.belongsTo(models.Topic, {
                foreignKey: 'topicId'
            });

            // Thiết lập mối quan hệ hasMany với mô hình Photo
            Lesson.hasMany(models.Photo, {
                foreignKey: 'lessonId',
                as: 'photos' // Đặt tên cho mối quan hệ để sử dụng trong các truy vấn
            });
        }
    }

    Lesson.init({
        lessonId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        word: {
            type: DataTypes.STRING(128)
        },
        linkVideo1: {
            type: DataTypes.STRING(255)
        },
        linkVideo2: {
            type: DataTypes.STRING(255)
        }
    }, {
        sequelize,
        modelName: 'Lesson',
        timestamps: false,
    });

    return Lesson;
};
