const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Image extends Model {}

Image.init({
    name_image_category: {
        type: DataTypes.STRING,
        allowNull: false
    },

    url_image: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    tableName: "image" 
})

module.exports = Image;




