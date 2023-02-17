'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Cards', [
      {
        cardTitle: "IZ card title 1",
        user_id: 1,
        order: 1,
        color: "#5BD1D7",
        cardUUID: "b80c3438-a30c-49fb-a2dd-bc1872ed8316",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cardTitle: "NB test card title 1",
        order: 1,
        color: "#5BD1D7",
        user_id: 2,
        cardUUID: "a7bec8c0-211c-4caa-9187-81469e2b04ae",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cardTitle: "NB test card title 2",
        order: 2,
        color: "#9EEB47",
        user_id: 2,
        cardUUID: "7255ac4f-0ad3-4714-836f-f81bdb21c541",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cardTitle: "NB test card title 3",
        user_id: 2,
        order: 3,
        color: "#BCCBFB",
        cardUUID: "b80c3438-a30c-49fb-a2dd-bc1872ed8316",
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
  }
};
