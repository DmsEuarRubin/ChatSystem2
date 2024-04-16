'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Chats, {foreignKey: "sender_id"}),
      Users.hasMany(models.Chats, {foreignKey: "receiver_id"}),
      Users.hasMany(models.Rooms, {foreignKey: "user_id"}),
      Users.hasMany(models.Groups, {foreignKey: "sender_id"}),
      Users.hasOne(models.Sockets, {foreignKey: "user_id"})
    }
  }
  Users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Users',
    timestamps: false
  });
  return Users;
};