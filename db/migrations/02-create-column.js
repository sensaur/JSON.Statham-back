'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Columns', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      columnTitle: {
        type: Sequelize.STRING,
      },
      order: {
        type: Sequelize.INTEGER
      },
      card_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "Cards",
            key: "id",
            as: "card_id",
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
    await queryInterface.dropTable('Columns');
  }
}
