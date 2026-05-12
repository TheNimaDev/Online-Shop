'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      "tbl_orders",
      {
        fields: ["checkout_id"],
        type: "FOREIGN KEY",
        name: "fk_order_checkout",
        references: {
          table: "tbl_checkouts",
          field: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("tbl_orders", "fk_order_checkout")
  },
}