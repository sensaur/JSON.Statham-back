'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      taskTitle: {
        type: Sequelize.STRING,
      },
      order: {
        type: Sequelize.INTEGER
      },
      column_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Columns",
            key: "id",
            as: "column_id",
          },
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Tasks');
  }
}
