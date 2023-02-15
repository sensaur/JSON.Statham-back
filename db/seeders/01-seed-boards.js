'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Boards', [
      {
        boardTitle: "IZ board title 1",
        user_id: 1,
        boardUUID: "b80c3438-a30c-49fb-a2dd-bc1872ed8316",
        createdAt: new Date(),
        updatedAt: new Date()
      },], {});
  },

  async down(queryInterface, Sequelize) {
  }
};
