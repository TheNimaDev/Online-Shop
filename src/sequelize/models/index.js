const UserModel = require("./user.model")
const RefreshtokenModel = require("./refreshtoken.model")
const AdminModel = require("./admin.model")

exports.modelsLoader = (sequelize) => {
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const User = UserModel(sequelize)
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const Refreshtoken = RefreshtokenModel(sequelize)
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const Admin = AdminModel(sequelize)

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

    return {
        User,
        Refreshtoken,
        Admin
    }
}