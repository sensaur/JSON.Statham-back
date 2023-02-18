'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Columns', [
      {
        columnTitle: "NB column title 1",
        order: 1,
        id: "526e341d-5790-41c8-9fcd-09ce0c641435",
        card_id: "a7bec8c0-211c-4caa-9187-81469e2b04ae",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        columnTitle: "NB column title 2",
        order: 2,
        id: "ce9056b3-f56a-4c84-a120-e37133eee233",
        card_id: "a7bec8c0-211c-4caa-9187-81469e2b04ae",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        columnTitle: "IZ column title 1",
        order: 1,
        id: "75888016-ecdf-49c2-9f34-3b3cadafb896",
        card_id: "b80c3438-a30c-49fb-a2dd-bc1872ed8316",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        columnTitle: "IZ column title 2",
        order: 2,
        id: "f0a1d551-1886-491c-b5d3-8e81c6d5d1a4",
        card_id: "b80c3438-a30c-49fb-a2dd-bc1872ed8316",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
  }
};
