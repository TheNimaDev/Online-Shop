'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      "tbl_notes",
      {
        fields: ["user_id"],
        type: "FOREIGN KEY",
        name: "fk_note_user",
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
    await queryInterface.removeConstraint("tbl_notes", "fk_note_user")
  },
}