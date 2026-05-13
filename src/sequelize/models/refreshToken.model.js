const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define(
    "refresh-token",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
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
      },
      expire_time: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      version: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "tbl_refreshTokens",
      timestamps: true,
      indexes: [
        {
          name: "idx_refreshToken",
          unique: true,
          fields: ["refreshToken"]
        }, {
          name: "idx_userId",
          unique: true,
          fields: ["user_id"]
        }
      ]
    }
  )
}