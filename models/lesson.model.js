'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Lesson extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Lesson.belongsTo(models.Topic, {
            foreignKey: 'topicId'
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
        linkVideo: {
            type:DataTypes.STRING(128)
        }
    }, {
        sequelize,
        modelName: 'Lesson',
        timestamps: false,
    })
    return Lesson;
}
