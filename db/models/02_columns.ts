'use strict';
import {
  Model
} from 'sequelize';

interface ColumnAttributes {
  columnTitle: string;
  order: number;
  card_id: number;
  // user_id: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Column extends Model <ColumnAttributes>
    implements ColumnAttributes {
    columnTitle!: string;
    order!: number;
    card_id!: number;
    // user_id!: number;
    static associate({Card, Task}: any) {
      this.belongsTo(Card, { foreignKey: "card_id" });
      this.hasMany(Task, { foreignKey: "column_id" })
    }
  }

  Column.init({
    columnTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
    },
    card_id: {
      type: DataTypes.INTEGER,
    },
    // user_id: {
    //   type: DataTypes.INTEGER,
    // },
  }, {
    sequelize,
    modelName: 'Column',
  });
  return Column;
};
