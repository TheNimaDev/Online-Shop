'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addConstraint(
      "tbl_products",
      {
        fields: ["category_id"],
        type: "FOREIGN KEY",
        name: "fk_product_category",
        references: {
          table: "tbl_categories",
          field: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("tbl_products", "fk_product_category")
  },
}