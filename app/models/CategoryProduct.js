const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class CategoryProduct extends Model {}

CategoryProduct.init({
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {   
    sequelize,
    tableName: "category_product"
})

module.exports = CategoryProduct;