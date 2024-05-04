'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Result.belongsTo(models.User, {
            foreignKey: 'userId'
        });
        Result.belongsTo(models.Lesson, {
            foreignKey: 'lessonId'
        });
      }
    }

    Result.init({
        resultId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT
        }
    }, {
        sequelize,
        modelName: 'Result',
        timestamps: false
    })
    return Result;
}