'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.addConstraint(
      "tbl_orderItems",
      {
        fields: ["order_id"],
        type: "FOREIGN KEY",
        name: "fk_orderItem_order",
        references: {
          table: "tbl_orders",
          field: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("tbl_orderItems", "fk_orderItem_order")
  },
}