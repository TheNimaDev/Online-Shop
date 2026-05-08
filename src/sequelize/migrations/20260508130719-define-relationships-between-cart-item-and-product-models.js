'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    
    await queryInterface.addConstraint(
      "tbl_cartItems",
      {
        fields: ["product_id"],
        type: "FOREIGN KEY",
        name: "fk_cartItem_product",
        references: {
          table: "tbl_products",
          field: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("tbl_cartItems", "fk_cartItem_product")
  },
}