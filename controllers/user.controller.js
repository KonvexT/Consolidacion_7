const Bootcamp = require("../models/bootcamp.model.js");
const User = require("../models/user.model.js");

const createUser = (datosUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existeuser = await User.findOne({ where: { email: datosUser.email } });
            if (existeuser) {
                throw new Error("El email ya está registrado");
            }

            const user = await User.create(datosUser);
            resolve(user);
        } catch (error) {
            reject(error);
        }
    });
}

const findUserById = (idUser) => {
    
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findByPk(idUser, {
                include: {
                    model: Bootcamp,
                    as: "bootcamps"
                }
            });
            if (!user) {
                reject("Usuario no encontrado");
            }
            resolve(user);
        } catch (error) {
            reject(error);
        }
    })
}

const findAllUsers = async () => {
    try {
        const users = await User.findAll({
            include: {
                model: Bootcamp,
                as: "bootcamps"
            }
        });
        return users;
    } catch (error) {
        throw error;
    }
};

const updateUserById = (idUser, datosUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findByPk(idUser);
            if (!user) {
                reject("Usuario no encontrado");
            }
            await user.update(datosUser);
            resolve("Usuario actualizado con éxito");
        } catch (error) {
            reject(error);
        }
    });
}

const deleteUserById = (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findByPk(idUser);
            if (!user) {
                reject("Usuario no encontrado");
            }
            await user.destroy();
            resolve("Usuario eliminado con éxito");
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = {createUser, findUserById, findAllUsers, updateUserById, deleteUserById}