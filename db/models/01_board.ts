'use strict';
import {
  Model
} from 'sequelize';

interface BoardAttributes {
  boardTitle: string;
  boardUUID: string;
  order: number;
  color: string;
  user_id: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Board extends Model <BoardAttributes>
    implements BoardAttributes {
    boardTitle!: string;
    order!: number;
    color!: string;
    user_id!: number;
    boardUUID!: string;
    static associate({User, Column}: any) {
      this.belongsTo(User, { foreignKey: "user_id" });
      this.hasMany(Column, { foreignKey: "board_id" })
    }
  }

  Board.init({
    boardTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
    },
    color: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.STRING,
    },
    boardUUID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};
