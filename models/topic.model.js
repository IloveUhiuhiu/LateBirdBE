'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Topic.hasMany(models.Lesson, {
            foreignKey: 'topicId',
            as: 'lessons' // Đặt tên cho mối quan hệ để sử dụng trong các truy vấn
        });
      }
    }
    Topic.init({
        topicId:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nameTopic: {
            type: DataTypes.STRING(128)
        },
        linkPhoto: {
            type: DataTypes.STRING(128)
        }
    }, {
        sequelize,
        modelName: 'Topic',
        timestamps: false
    })
    return Topic;
}