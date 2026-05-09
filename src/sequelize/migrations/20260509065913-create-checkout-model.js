'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(
      "tbl_checkouts",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
        },
        expire: {
          type: Sequelize.DataTypes.BIGINT,
          allowNull: false
        },
        authority: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        total_price: {
          type: Sequelize.DataTypes.INTEGER,
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

    await queryInterface.addConstraint("tbl_checkouts", {
      fields: ["authority"],
      type: "UNIQUE",
      name: "idx_checkout_authority",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_checkouts")
  }
}