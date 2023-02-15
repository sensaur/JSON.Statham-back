'use strict';
import {
  Model
} from 'sequelize';

interface BoardAttributes {
  boardTitle: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model <BoardAttributes>
    implements BoardAttributes {
    boardTitle!: string;
    static associate() {
    }
  }

  User.init({
    boardTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Board',
  });
  return User;
};
