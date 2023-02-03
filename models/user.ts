'use strict';
// const {
//   Model
// } = require('sequelize');

import {
  Model
} from 'sequelize';

interface UserAttributes {
  userName: string;
  email: string;
  password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model <UserAttributes>
    implements UserAttributes {
    userName!: string;
    email!: string;
    password!: string;

    static associate(models: any) {
    }
  }

  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
