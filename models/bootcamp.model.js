const { DataTypes} = require("sequelize");
const conexion = require("../config/db.config.js");
const User = require("./user.model.js");

const Bootcamp = conexion.define("bootcamps", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(250),
        allowNull: false
    }
})

User.belongsToMany(Bootcamp,{
    through: "users_bootcamps",
    as: "bootcamps",
    foreignKey: "user_id"
})

Bootcamp.belongsToMany(User,{
    through: "users_bootcamps",
    as: "users",
    foreignKey: "bootcamp_id"
})

module.exports = Bootcamp;