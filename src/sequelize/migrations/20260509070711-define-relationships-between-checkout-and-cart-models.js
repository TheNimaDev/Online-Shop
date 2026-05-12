'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn(
      "tbl_checkouts", "cart_id",
      {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      }
    )

    await queryInterface.addConstraint(
      "tbl_checkouts",
      {
        fields: ["cart_id"],
        type: "FOREIGN KEY",
        name: "fk_checkout_cart",
        references: {
          table: "tbl_carts",
          field: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("tbl_checkouts", "fk_checkout_cart")
  },
}