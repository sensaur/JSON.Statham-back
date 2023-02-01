'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: "Ivanov Ivan",
        email: "111111@mail.ru",
        password: "1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Petrov Petr",
        email: "2111111@mail.ru",
        password: "2",
        createdAt: new Date(),
        updatedAt: new Date()
      },], {});
  },

  async down(queryInterface, Sequelize) {
  }
};
