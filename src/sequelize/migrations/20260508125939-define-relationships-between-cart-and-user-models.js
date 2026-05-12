'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      "tbl_carts",
      {
        fields: ["user_id"],
        type: "FOREIGN KEY",
        name: "fk_cart_user",
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
    await queryInterface.removeConstraint("tbl_carts", "fk_cart_user")
  },
}