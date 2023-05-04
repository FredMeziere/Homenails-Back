const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class UserPurchase extends Model {}

UserPurchase.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    purchase_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    sequelize,
    tableName: "user_purchase"
})  

module.exports = UserPurchase;