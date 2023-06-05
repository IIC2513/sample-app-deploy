"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("books", [
      {
        name: "harry potter",
        author: "j.k. rowling",
        price: 12_000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "percy jackson",
        author: "rick riordan",
        price: 7_000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "the lord of the rings",
        author: "j.r.r. tolkien",
        price: 15_000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("books", null, {});
  },
};
