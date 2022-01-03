'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    static associate(models) {
      Images.hasOne(models.User,{
        foreignKey: 'user_id',
        as: 'user_id',
      })
    }
  };
  Images.init({
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isPrivate: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'images',
  });
  return Images;
};