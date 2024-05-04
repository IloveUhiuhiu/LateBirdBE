'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Photo extends Model {
        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
        Photo.belongsTo(models.Lesson, {
            foreignKey: 'lessonId'
        });
      }
    
    }
    Photo.init( {
        photoId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }, 
        linkPhoto:  {
            type: DataTypes.STRING(128)
        }
    }, {
        sequelize,
        modelName: 'Photo',
        timestamps: false,
    }
    )
    return Photo;
}