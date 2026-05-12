'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(
      "tbl_cartItems",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
        },
        count: {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 1,
          allowNull: false
        },
        cart_id: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false
        },
        product_id: {
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_cartItems")
  }
}