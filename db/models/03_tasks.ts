'use strict';
import {
  Model
} from 'sequelize';

interface TaskAttributes {
  taskTitle: string;
  taskDescription: string;
  order: number;
  column_id: number;
  isDone: boolean
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Task extends Model <TaskAttributes>
    implements TaskAttributes {
    taskTitle!: string;
    taskDescription!: string;
    order!: number;
    column_id!: number;
    isDone!: boolean;
    static associate({Column}: any) {
      this.belongsTo(Column, { foreignKey: "column_id" });
    }
  }

  Task.init({
    taskTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN
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
