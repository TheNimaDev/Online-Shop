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
        cart_id: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false
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
        status: {
          type: Sequelize.DataTypes.ENUM,
          values: ["paid", "unpaid", "pending"],
          allowNull: false,
          defaultValue: "pending"
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

    await queryInterface.addIndex("tbl_checkouts", ["authority"], {
      name: "idx_authority",
      unique: true
    })

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_checkouts")
  }
}