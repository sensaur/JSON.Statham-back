'use strict';
import {
  Model
} from 'sequelize';

interface UserAttributes {
  userName: string;
  userUUID: string;
  email: string;
  password: string;
  avatar: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model <UserAttributes>
    implements UserAttributes {
    userName!: string;
    userUUID!: string;
    avatar!: string;
    email!: string;
    password!: string;
    static associate({Card}: any) {
      this.hasMany(Card, { foreignKey: "user_id" })
    }
  }

  User.init({
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userUUID: {
      type: DataTypes.UUID,
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
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
