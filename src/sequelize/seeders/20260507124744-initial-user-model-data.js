const { v4: uuidV4 } = require('uuid')
const bcrypt = require("bcrypt")

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tbl_users",
      [
        {
          id: uuidV4(),
          name: "admin",
          email: "admin@gmail.com",
          password: await bcrypt.hash("admin", 3),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_users", null, {})
  }
}
