const { DataTypes} = require("sequelize");
const conexion = require("../config/db.config.js");

const User = conexion.define("users", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true
    }
})

module.exports = User;