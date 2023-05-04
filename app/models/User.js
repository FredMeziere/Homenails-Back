const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class User extends Model {}

User.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    email : {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    firstname: {
        type : DataTypes.STRING,
        allowNull: false
    },

    lastname: { 
        type: DataTypes.STRING,
        allowNull: false
    },

    civility: {
        type: DataTypes.STRING,
        allowNull: false

    },

    address: {
        type: DataTypes.STRING,
        allowNull: true
    },

    aditionnal_address: {
        type: DataTypes.STRING,
        allowNull: true
    },

    country: {
        type: DataTypes.STRING,
        allowNull: true
    },

    city: {
        type: DataTypes.STRING,
        allowNull: true
    },

    zipcode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
    phone_number: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false

    }

}, {
    sequelize,
    tableName: "user"

})


module.exports = User;





