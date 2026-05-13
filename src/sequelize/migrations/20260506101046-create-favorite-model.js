'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_favorites", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false
      },
      product_id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      }
    })

    await queryInterface.addIndex("tbl_favorites", ["user_id", "product_id"], {
      name: "idx_userId_productId",
      unique: true
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_favorites")
  },
};
