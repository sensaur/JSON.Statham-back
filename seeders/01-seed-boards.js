'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Boards', [
      {
        boardTitle: "IZ board title 1",
        createdAt: new Date(),
        updatedAt: new Date()
      },], {});
  },

  async down(queryInterface, Sequelize) {
  }
};
