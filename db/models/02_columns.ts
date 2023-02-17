'use strict';
import {
  Model
} from 'sequelize';

interface ColumnAttributes {
  columnTitle: string;
  columnUUID: string;
  order: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Column extends Model <ColumnAttributes>
    implements ColumnAttributes {
    columnTitle!: string;
    columnUUID!: string;
    order!: number;
    static associate() {
      // this.belongsTo(Board, { foreignKey: "board_id" });
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
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Column;
};
