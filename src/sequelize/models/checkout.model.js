const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define(
    "checkouts",
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
      expire: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      authority: {
        type: DataTypes.STRING,
        allowNull: false
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM,
        values: ["paid", "unpaid", "pending"],
        allowNull: false,
        defaultValue: "pending"
      },
    },
    {
      tableName: "tbl_checkouts",
      timestamps: true,
      indexes: [
        {
          name: "idx_authority",
          unique: true,
          fields: ["authority"]
        }
      ]
    }
  )
}