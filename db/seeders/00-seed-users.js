'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        userName: "Ilia Zhigarev",
        userUUID: "05120992-0a0e-4580-baf9-214ca3bfe23c",
        email: "ilya.zhigarev@gmail.com",
        password: "$2b$11$S6lm3x0RRb2SQxx4/ocip.wak2V7aQ4JFJQfUli4CGPBExtcqzJRK",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: "Nikola Balabanov",
        userUUID: "ac7a0ef8-2394-4b06-be76-93b0cfd71d0b",
        email: "nikola.balabanov@gmail.ru",
        password: "$2b$11$S6lm3x0RRb2SQxx4/ocip.wak2V7aQ4JFJQfUli4CGPBExtcqzJRK",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: "Vladislav Kozlov",
        userUUID: "72a98278-c2cd-450b-89aa-5b3505dcb64e",
        email: "vladislav.kozlov@gmail.ru",
        password: "$2b$11$S6lm3x0RRb2SQxx4/ocip.wak2V7aQ4JFJQfUli4CGPBExtcqzJRK",
        createdAt: new Date(),
        updatedAt: new Date()
      },], {});
  },

  async down(queryInterface, Sequelize) {
  }
};
