'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addConstraint(
      "tbl_refreshTokens",
      {
        fields: ["user_id"],
        type: "FOREIGN KEY",
        name: "fk_refreshToken_user",
        references: {
          table: "tbl_users",
          field: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("tbl_refreshTokens", "fk_refreshToken_user")
  }
}