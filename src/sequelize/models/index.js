const UserModel = require("./user.model")
const RefreshtokenModel = require("./refreshtoken.model")
const AdminModel = require("./admin.model")
const CategoryModel = require("./category.model")
const ProductModel = require("./product.model")
const FavoriteModel = require("./favorite.model")
const CommentModel = require("./comment.model")
const NoteModel = require("./note.model")
const CartModel = require("./cart.model")
const CartItemModel = require("./cartItem.model")
const CheckoutModel = require("./checkout.model")
const OrderModel = require("./order.model")

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
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const Comment = CommentModel(sequelize)
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const Note = NoteModel(sequelize)
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const Cart = CartModel(sequelize)
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const CartItem = CartItemModel(sequelize)
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const Checkout = CheckoutModel(sequelize)
    /**@type{import("sequelize").ModelCtor<import("sequelize").Model<any,any>} */
    const Order = OrderModel(sequelize)

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

    User.hasMany(Comment, {
        foreignKey: "user_id",
        as: "comments"
    })
    Comment.belongsTo(User, {
        foreignKey: "user_id",
        as: "user"
    })
    Product.hasMany(Comment, {
        foreignKey: "product_id",
        as: "comments"
    })
    Comment.belongsTo(Product, {
        foreignKey: "product_id",
        as: "product"
    })

    User.hasMany(Note, {
        foreignKey: "user_id",
        as: "notes"
    })
    Note.belongsTo(User, {
        foreignKey: "user_id",
        as: "user"
    })
    Product.hasMany(Note, {
        foreignKey: "product_id",
        as: "notes"
    })
    Note.belongsTo(Product, {
        foreignKey: "product_id",
        as: "product"
    })

    User.hasOne(Cart, {
        foreignKey: "user_id",
        as: "cart"
    })
    Cart.belongsTo(User, {
        foreignKey: "user_id",
        as: "user"
    })

    Cart.hasMany(CartItem, {
        foreignKey: "cart_id",
        as: "items"
    })
    CartItem.belongsTo(Cart, {
        foreignKey: "cart_id",
        as: "cart"
    })
    Product.hasMany(CartItem, {
        foreignKey: "product_id",
        as: "cartItem"
    })
    CartItem.belongsTo(Product, {
        foreignKey: "product_id",
        as: "product"
    })

    Cart.hasMany(Checkout, {
        foreignKey: "cart_id",
        as: "checkouts"
    })
    Checkout.belongsTo(Cart, {
        foreignKey: "cart_id",
        as: "cart"
    })

    Checkout.hasOne(Order, {
        foreignKey: "checkout_id",
        as: "order"
    })
    Order.belongsTo(Checkout, {
        foreignKey: "checkout_id",
        as: "checkout"
    })
    User.hasMany(Order, {
        foreignKey: "user_id",
        as: "orders"
    })
    Order.belongsTo(User, {
        foreignKey: "user_id",
        as: "user"
    })

    return {
        User,
        Refreshtoken,
        Admin,
        Category,
        Product,
        Favorite,
        Comment,
        Note,
        Cart,
        CartItem,
        Checkout,
        Order
    }
}