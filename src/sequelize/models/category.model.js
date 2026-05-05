const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  return sequelize.define(
    "category",
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
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      tableName: "tbl_categories",
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