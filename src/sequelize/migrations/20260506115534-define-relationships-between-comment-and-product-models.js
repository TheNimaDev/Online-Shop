'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      "tbl_comments", "product_id",
      {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      }
    )

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
    await queryInterface.removeColumn("tbl_comments", "product_id")
  },
}