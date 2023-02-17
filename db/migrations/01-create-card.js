'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cards', {
      id: {
        // allowNull: false,
        // autoIncrement: true,
        // // primaryKey: true,
        // type: Sequelize.INTEGER
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      cardTitle: {
        type: Sequelize.STRING,
      },
      order: {
        type: Sequelize.INTEGER
      },
      color: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
            key: "id",
            as: "user_id",
          },
        },
        onUpdate: "CASCADE",
      },
      // cardUUID: {
      //   type: Sequelize.STRING,
      //   unique: true,
      //   allowNull: false,
      //   primaryKey: true
      // },
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
    await queryInterface.dropTable('Cards');
  }
};
