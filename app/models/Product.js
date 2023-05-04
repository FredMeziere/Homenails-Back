const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Product extends Model {}

Product.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }, 

    description : {
        type: DataTypes.TEXT,
        allowNull: false
    },

    price: {
        type: DataTypes.DECIMAL(8,2),
        allowNull: false
    },

    price_reduce: {
        type: DataTypes.DECIMAL(8,2),
        allowNull: true
    },

    main_image: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    
    guide_image: {
        type: DataTypes.STRING,
        allowNull: true
    },

    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    image_id: {
        type: DataTypes.STRING,
        allowNull: false
    },     

    remaining_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "product"
    
})


module.exports = Product;