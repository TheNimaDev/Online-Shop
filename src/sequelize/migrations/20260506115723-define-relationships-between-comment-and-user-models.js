'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      "tbl_comments", "user_id",
      {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      }
    )

    await queryInterface.addConstraint(
      "tbl_comments",
      {
        fields: ["user_id"],
        type: "FOREIGN KEY",
        name: "fk_comment_user",
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
    await queryInterface.removeConstraint("tbl_comments", "fk_comment_user")
    await queryInterface.removeColumn("tbl_comments", "user_id")
  },
}