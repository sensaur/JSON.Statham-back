'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Tasks', [
      {
        taskTitle: "NB task title 1",
        order: 1,
        id: "09f178bd-6521-4195-8a08-468745d79869",
        column_id: "526e341d-5790-41c8-9fcd-09ce0c641435",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskTitle: "NB task title 2",
        order: 2,
        id: "f56d1a6b-df25-43b4-a5ca-f94ed4d280d9",
        column_id: "526e341d-5790-41c8-9fcd-09ce0c641435",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
  }
};
