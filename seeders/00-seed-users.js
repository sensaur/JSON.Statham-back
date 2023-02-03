'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        userName: "Ilia Zhigarev",
        email: "ilya.zhigarev@gmail.com",
        password: "$2b$11$S6lm3x0RRb2SQxx4/ocip.wak2V7aQ4JFJQfUli4CGPBExtcqzJRK",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: "Nikola Balabanov",
        email: "nikola.balabanov@gmail.ru",
        password: "$2b$11$S6lm3x0RRb2SQxx4/ocip.wak2V7aQ4JFJQfUli4CGPBExtcqzJRK",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: "Vladislav Kozlov",
        email: "vladislav.kozlov@gmail.ru",
        password: "$2b$11$S6lm3x0RRb2SQxx4/ocip.wak2V7aQ4JFJQfUli4CGPBExtcqzJRK",
        createdAt: new Date(),
        updatedAt: new Date()
      },], {});
  },

  async down(queryInterface, Sequelize) {
  }
};
