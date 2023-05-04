const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Purchase extends Model {}

Purchase.init({
    serial_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    content_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    price: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false
    },

    date_purchase: {
        type: DataTypes.DATE,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "purchase"
})

module.exports = Purchase;


