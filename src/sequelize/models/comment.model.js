const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define(
    "comment",
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
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      positivePoints: {
        type: DataTypes.JSON,
        allowNull: true
      },
      negetivePoints: {
        type: DataTypes.JSON,
        allowNull: true
      },
      rate: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
        validate: {
          min: 0,
          max: 5
        }
      }
    },
    {
      tableName: "tbl_comments",
      timestamps: true,
      indexes: [
        {
          name: "idx_comment_user_product",
          fields: ["user_id", "product_id"],
          unique: true
        }
      ]
    }
  )
}