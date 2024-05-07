'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // define association here
      }
    }

    User.init({
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(64),
            unique: true
        },
        hashedPassword: {
            type: DataTypes.STRING(64)
        },
        fullname: {
            type: DataTypes.STRING(64)
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        birthday: {
            type: DataTypes.DATEONLY
        },
        avatar: {
            type: DataTypes.STRING(128)
        }
        }, {
            sequelize,
            modelName: 'User',
            timestamps: false,
        }
    )
    return User;
}