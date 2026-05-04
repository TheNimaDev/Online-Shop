'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable(
      "tbl_users",
      {
        id: {
          type: Sequelize.DataTypes.UUID,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.DataTypes.STRING,
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

    await queryInterface.addIndex("tbl_users", ["email"],
      {
        name: "idx_email",
        unique: true
      }
    )
  },

  async down(queryInterface) {
    await queryInterface.dropTable("tbl_users")
  }

}