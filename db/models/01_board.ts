'use strict';
import {
  Model
} from 'sequelize';

interface BoardAttributes {
  boardTitle: string;
  boardUUID: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Board extends Model <BoardAttributes>
    implements BoardAttributes {
    boardTitle!: string;
    boardUUID!: string;
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
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};
