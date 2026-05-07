const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define(
    "note",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
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
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "tbl_products",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        }
      }
    },
    {
      tableName: "tbl_notes",
      timestamps: true,
      indexes: [
        {
          name: "idx_note_user_product",
          fields: ["user_id", "product_id"],
          unique: true
        }
      ]
    }
  )
}