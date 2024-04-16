'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Groups.belongsTo(models.Rooms, {foreignKey: "room_id"}),
      Groups.belongsTo(models.Users, {foreignKey: "sender_id"})
    }
  }
  Groups.init({
    room_id: DataTypes.INTEGER,
    sender_id: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Groups',
  });
  return Groups;
};