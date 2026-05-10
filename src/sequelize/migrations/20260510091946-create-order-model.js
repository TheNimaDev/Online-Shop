'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(
      "tbl_orders",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false
        },
        checkout_id: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    )

    await queryInterface.addConstraint("tbl_orders", {
      fields: ["user_id", "checkout_id"],
      type: "UNIQUE",
      name: "idx_order_user_checkout",
    })
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_orders")
  }
}