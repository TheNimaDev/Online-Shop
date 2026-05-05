'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_products", {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      slug: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      views: {
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0
      },
      rate: {
        type: Sequelize.DataTypes.DECIMAL(2, 1),
        defaultValue: 5,
        validate: {
          min: 0,
          max: 5,
        },
      },
      inventory: {
        type: Sequelize.DataTypes.INTEGER,
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

    await queryInterface.addIndex("tbl_products", ["slug"], {
      name: "idx_slug",
      unique: true
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_products")
  },
};
