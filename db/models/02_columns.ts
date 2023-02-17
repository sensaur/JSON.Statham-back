'use strict';
import {
  Model
} from 'sequelize';

interface ColumnAttributes {
  columnTitle: string;
  columnUUID: string;
  order: number;
  board_id: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Column extends Model <ColumnAttributes>
    implements ColumnAttributes {
    columnTitle!: string;
    columnUUID!: string;
    order!: number;
    board_id!: number;
    static associate({Board}: any) {
      this.belongsTo(Board, { foreignKey: "board_id" });
    }
  }

  Column.init({
    columnTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    columnUUID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
    },
    board_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Column',
  });
  return Column;
};
