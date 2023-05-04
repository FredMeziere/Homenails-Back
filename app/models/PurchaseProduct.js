const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class PurchaseProduct extends Model {}

PurchaseProduct.init({
    purchase_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    sequelize,
    tableName: "purchase_product"
})

module.exports = PurchaseProduct;