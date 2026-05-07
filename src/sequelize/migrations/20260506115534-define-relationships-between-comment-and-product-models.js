'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint(
      "tbl_comments",
      {
        fields: ["product_id"],
        type: "FOREIGN KEY",
        name: "fk_comment_product",
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
    await queryInterface.removeConstraint("tbl_comments", "fk_comment_product")
  },
}