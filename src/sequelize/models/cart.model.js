const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define(
    "carts",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "tbl_users",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    },
    {
      tableName: "tbl_carts",
      timestamps: true,
      indexes: [
        {
          name: "idx_userId",
          unique: true,
          fields: ["user_id"]
        }
      ]
    }
  )
}