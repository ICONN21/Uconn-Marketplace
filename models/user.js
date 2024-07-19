const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}
 
User.init(
  {
      // Define attributes of the User model
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  // Ensures that no two users can have the same username
        validate: {
          notEmpty: true  // Ensures the username is not empty
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  // Ensures that no two users can have the same email
        validate: {
          isEmail: true  // Validates the email format
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100]  // Ensures the password is at least 8 characters long but no more than 100
        }
      }
    }, {
      // Model options
      sequelize,
      tableName: 'users',  // Explicitly specify the table name in the database
      timestamps: true,   // Enables Sequelize to automatically add the `createdAt` and `updatedAt` fields
      underscored: true   // Indicates that snake_case should be used for column names instead of camelCase
    });

  module.exports = User;
  