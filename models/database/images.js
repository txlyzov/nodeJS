'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Images.hasOne(models.User,{
        foreignKey: 'user_id',
        as: 'user_id',
      })
      // define association here
    }
  };
  Images.init({
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isPrivate: DataTypes.BOOLEAN,
    //??? edit for key options?
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'images',
  });
  return Images;
};