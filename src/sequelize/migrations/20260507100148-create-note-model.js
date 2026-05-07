'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_notes", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      text: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
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

    await queryInterface.addConstraint("tbl_notes", {
      fields: ["user_id", "product_id"],
      type: "UNIQUE",
      name: "idx_note_user_product",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_notes")
  },
}