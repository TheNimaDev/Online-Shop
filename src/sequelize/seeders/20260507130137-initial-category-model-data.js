const { v4: uuidV4 } = require('uuid')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert("tbl_categories",
      [
        {
          id: uuidV4(),
          slug: "books",
          title: "The Books",
          description: "A Variety Of Books With Different Styles For Everyone",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          id: uuidV4(),
          slug: "musical_instruments",
          title: "The Musical Instruments",
          description: "Various Instruments From Traditional To Modern",
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          id: uuidV4(),
          slug: "home_appliances",
          title: "The Home Appliances",
          description: "Different Brands Of Home Appliances",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_categories", null, {})
  }
}
