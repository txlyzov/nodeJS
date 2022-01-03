'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
    }
  };
  Users.init({
    //user_id: DataTypes.INTEGER,
    login: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING//,
    //created_at: DataTypes.DATE,
    //updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users',
  });
  return Users;
};
