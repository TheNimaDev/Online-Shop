const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define(
    "cartItems",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      cart_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "tbl_carts",
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
    },
    {
      tableName: "tbl_cartItems",
      timestamps: true,
      indexes: [
        {
          name: "idx_cartItem_product_cart",
          unique: true,
          fields: ["cart_id", "product_id"]
        }
      ]
    }
  )
}