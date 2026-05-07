const { v4: uuidV4 } = require('uuid')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [theUser] = await queryInterface.sequelize.query(`
      SELECT id FROM tbl_users WHERE email = "admin@gmail.com"
    `)

    await queryInterface.bulkInsert("tbl_admins",
      [
        {
          id: uuidV4(),
          user_id: theUser[0].id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tbl_admins", null, {})
  }
}
