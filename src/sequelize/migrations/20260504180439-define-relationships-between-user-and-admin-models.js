'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      "tbl_admins", "user_id",
      {
        type: Sequelize.DataTypes.UUID,
        allowNull: false
      }
    )

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

    await queryInterface.addIndex("tbl_admins", ["user_id"],
      {
        name: "idx_userId",
        unique: true
      }
    )

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("tbl_admins", "idx_userId")
    await queryInterface.removeConstraint("tbl_admins", "user_id")
    await queryInterface.dropTable("tbl_admins")
  }
}