'use strict';
import {
  Model
} from 'sequelize';

interface BoardAttributes {
  boardTitle: string;
  boardUUID: string;
  order: number;
  color: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Board extends Model <BoardAttributes>
    implements BoardAttributes {
    boardTitle!: string;
    boardUUID!: string;
    order!: number;
    color!: string;
    static associate({User}: any) {
      this.belongsTo(User, { foreignKey: "user_id" });
    }
  }

  Board.init({
    boardTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    boardUUID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
    },
    color: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};
