const UserModel = require("./user.model")
const RefreshtokenModel = require("./refreshtoken.model")
const AdminModel = require("./admin.model")
const CategoryModel = require("./category.model")
const ProductModel = require("./product.model")
const FavoriteModel = require("./favorite.model")

exports.modelsLoader = (sequelize) => {
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const User = UserModel(sequelize)
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const Refreshtoken = RefreshtokenModel(sequelize)
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const Admin = AdminModel(sequelize)
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const Category = CategoryModel(sequelize)
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const Product = ProductModel(sequelize)
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const Favorite = FavoriteModel(sequelize)

    User.hasOne(Refreshtoken, {
        foreignKey: "user_id",
        as: "refreshToken"
    })
    Refreshtoken.belongsTo(User, {
        foreignKey: "user_id",
        as: "user"
    })

    User.hasOne(Admin, {
        foreignKey: "user_id",
        as: "admin"
    })
    Admin.belongsTo(User, {
        foreignKey: "user_id",
        as: "user"
    })

    Category.hasMany(Product, {
        foreignKey: "category_id",
        as: "products"
    })
    Product.belongsTo(Category, {
        foreignKey: "category_id",
        as: "category"
    })

    User.hasMany(Favorite, {
        foreignKey: "user_id",
        as: "favorites"
    })
    Favorite.belongsTo(User, {
        foreignKey: "user_id",
        as: "user"
    })
    Product.hasMany(Favorite, {
        foreignKey: "product_id",
        as: "favorites"
    })
    Favorite.belongsTo(Product, {
        foreignKey: "product_id",
        as: "product"
    })

    return {
        User,
        Refreshtoken,
        Admin,
        Category,
        Product,
        Favorite
    }
}