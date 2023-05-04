const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class UserFavorites extends Model {}   

UserFavorites.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    sequelize,
    tableName: "user_favorites"
})

module.exports = UserFavorites;