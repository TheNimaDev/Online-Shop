const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define(
    "order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "tbl_users",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        }
      },
      checkout_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "tbl_checkouts",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        }
      }
    },
    {
      tableName: "tbl_orders",
      timestamps: true,
      indexes: [
        {
          name: "idx_order_user_checkout",
          fields: ["user_id", "checkout_id"],
          unique: true
        }
      ]
    }
  )
}