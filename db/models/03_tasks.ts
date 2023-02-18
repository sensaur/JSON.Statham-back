'use strict';
import {
  Model
} from 'sequelize';

interface TaskAttributes {
  taskTitle: string;
  order: number;
  column_id: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Task extends Model <TaskAttributes>
    implements TaskAttributes {
    taskTitle!: string;
    order!: number;
    column_id!: number;
    static associate({Column}: any) {
      this.belongsTo(Column, { foreignKey: "column_id" });
    }
  }

  Task.init({
    taskTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
    },
    column_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
