const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define(
    "admins",
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
        onDelete: "RESTRICT",
        onUpdate: "CASCADE"
      }
    },
    {
      tableName: "tbl_admins",
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