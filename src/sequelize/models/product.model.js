const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      rate: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        defaultValue:5
      },
      inventory: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "tbl_categories",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
    },
    {
      tableName: "tbl_products",
      timestamps: true,
      indexes: [
        {
          name: "idx_slug",
          fields: ["slug"],
          unique: true
        }
      ]
    }
  )
}