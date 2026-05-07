'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_comments", {
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
      text: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false
      },
      positivePoints: {
        type: Sequelize.DataTypes.JSON,
        allowNull: true
      },
      negetivePoints: {
        type: Sequelize.DataTypes.JSON,
        allowNull: true
      },
      rate: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 5,
        validate: {
          min: 0,
          max: 5
        }
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

    await queryInterface.addConstraint("tbl_comments", {
      fields: ["user_id", "product_id"],
      type: "UNIQUE",
      name: "idx_comment_user_product",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_comments")
  },
}