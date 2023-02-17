'use strict';
import {
  Model
} from 'sequelize';

interface cardAttributes {
  cardTitle: string;
  cardUUID: string;
  order: number;
  color: string;
  user_id: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Card extends Model <cardAttributes>
    implements cardAttributes {
    cardTitle!: string;
    order!: number;
    color!: string;
    user_id!: number;
    cardUUID!: string;
    static associate({User, Column}: any) {
      this.belongsTo(User, { foreignKey: "user_id" });
      this.hasMany(Column, { foreignKey: "card_id" })
    }
  }

  Card.init({
    cardTitle: {
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
    cardUUID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};
