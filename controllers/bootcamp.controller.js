const Bootcamp = require("../models/bootcamp.model.js");
const User = require("../models/user.model.js");

const createBootcamp = (datosBootcamp) => {
    return new Promise(async (resolve, reject) => {
        try {
            const bootcamp = await Bootcamp.create(datosBootcamp);
            resolve(bootcamp);
        } catch (error) {
            reject(error);
        }
    });
}

const addUser = (idBootcamp, idUser) => {
    return new Promise(async(resolve, reject) => {
        try {
            const bootcamp = await Bootcamp.findByPk(idBootcamp);
            if(!bootcamp) {
                reject("El id del bootcamp no existe en nuestros registros");
            }

            const user = await User.findByPk(idUser);
            if(!user) {
                reject("EL id del user no existe en nuestros registros");
            }

            const asignacion = await bootcamp.addUser(user);
            console.log(asignacion);
            resolve("User asignado con éxito");
        } catch (error) {
            reject(error);
        }
        
    });
}

const findBootcampById = (idBootcamp) => {
    
    return new Promise(async (resolve, reject) => {
        try {
            const bootcamp = await Bootcamp.findByPk(idBootcamp, {
                include: {
                    model: User,
                    as: "users"
                }
            });
            resolve(bootcamp);
        } catch (error) {
            reject(error);
        }
    })
}

const findAllBootcamps = async () => {
    try {
        const bootcamps = await Bootcamp.findAll({
            include: {
                model: User,
                as: "users"
            }
        });
        return bootcamps;
    } catch (error) {
        throw error;
    }
};


module.exports = {createBootcamp, addUser, findBootcampById, findAllBootcamps}