'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(
      "tbl_refreshTokens",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
        },
        refresh_token: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false
        },
        expire_time: {
          type: Sequelize.DataTypes.BIGINT,
          allowNull: false,
        },
        version: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false
        }
      }
    )

    await queryInterface.addIndex("tbl_refreshTokens", ["refresh_token"],
      {
        name: "idx_refreshToken",
        unique: true
      }
    )
    await queryInterface.addIndex("tbl_refreshTokens", ["user_id"],
      {
        name: "idx_userId",
        unique: true
      }
    )
  },

  async down(queryInterface) {
    await queryInterface.dropTable("tbl_refreshTokens")
  }

}