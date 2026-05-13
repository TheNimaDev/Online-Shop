'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addConstraint(
      "tbl_admins",
      {
        fields: ["user_id"],
        type: "FOREIGN KEY",
        name: "fk_admins_user",
        references: {
          table: "tbl_users",
          field: "id"
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("tbl_admins", "fk_admin_user")
  }
}