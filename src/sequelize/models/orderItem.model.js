const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define(
    "orderItems",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "tbl_orders",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "tbl_products",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
      },
      productPriceAtTimeOfPurchase: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "tbl_orderItems",
      timestamps: true,
      indexes: [
        {
          name: "idx_orderItem_product_order",
          unique: true,
          fields: ["order_id", "product_id"]
        }
      ]
    }
  )
}