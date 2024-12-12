const conexion = require("./config/db.config");
const Bootcamp = require("./models/bootcamp.model");
const User = require("./models/user.model");
const { createBootcamp, addUser, findBootcampById, findAllBootcamps } = require("./controllers/bootcamp.controller.js");
const { createUser, findUserById, findAllUsers, updateUserById, deleteUserById } = require("./controllers/user.controller.js");

(async () => {
    try {
        await conexion.sync();

        // Crear usuarios
        const usuario1 = await createUser({
            firstName: "Mateo",
            lastName: "Díaz",
            email: "mateo.diaz@correo.com"
        });
        console.log("Usuario 1 creado:", usuario1);

        const usuario2 = await createUser({
            firstName: "Santiago",
            lastName: "Mejías",
            email: "santiago.mejias@correo.com"
        });
        console.log("Usuario 2 creado:", usuario2);

        const usuario3 = await createUser({
            firstName: "Lucas",
            lastName: "Rojas",
            email: "lucas.rojas@correo.com"
        });
        console.log("Usuario 3 creado:", usuario3);

        const usuario4 = await createUser({
            firstName: "Facundo",
            lastName: "Fernandez",
            email: "facundo.fernandez@correo.com"
        });
        console.log("Usuario 4 creado:", usuario4);

        // Crear Bootcamps
        const bootcamp1 = await createBootcamp({
            title: "Introduciendo El Bootcamp De React",
            cue: 10,
            description: "React es la librería más usada en JavaScript para el desarrollo de interfaces."
        });
        console.log("Bootcamp 1 creado:", bootcamp1);

        const bootcamp2 = await createBootcamp({
            title: "Bootcamp Desarrollo Web Full Stack",
            cue: 12,
            description: "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS."
        });
        console.log("Bootcamp 2 creado:", bootcamp2);

        const bootcamp3 = await createBootcamp({
            title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning",
            cue: 18,
            description: "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning."
        });
        console.log("Bootcamp 3 creado:", bootcamp3);

        // Agregar usuarios a bootcamps
        await addUser(bootcamp1.id, usuario1.id);
        console.log(`Agregado el usuario id=${usuario1.id} al bootcamp con id=${bootcamp1.id}`);

        await addUser(bootcamp1.id, usuario2.id);
        console.log(`Agregado el usuario id=${usuario2.id} al bootcamp con id=${bootcamp1.id}`);

        await addUser(bootcamp2.id, usuario1.id);
        console.log(`Agregado el usuario id=${usuario1.id} al bootcamp con id=${bootcamp2.id}`);

        await addUser(bootcamp3.id, usuario1.id);
        console.log(`Agregado el usuario id=${usuario1.id} al bootcamp con id=${bootcamp3.id}`);

        await addUser(bootcamp3.id, usuario2.id);
        console.log(`Agregado el usuario id=${usuario2.id} al bootcamp con id=${bootcamp3.id}`);

        await addUser(bootcamp3.id, usuario3.id);
        console.log(`Agregado el usuario id=${usuario3.id} al bootcamp con id=${bootcamp3.id}`);

        // Consultar Bootcamp por ID
        const bootcampReact = await findBootcampById(1);
        console.log("Consulta Bootcamp React por ID:", JSON.parse(JSON.stringify(bootcampReact)));

        // Listar todos los Bootcamps
        const allBootcamps = await findAllBootcamps();
        console.log("Lista de todos los Bootcamps:", JSON.parse(JSON.stringify(allBootcamps)));

        // Consultar usuario por ID
        const userMateo = await findUserById(1);
        console.log("Consulta de usuario Mateo por ID:", JSON.parse(JSON.stringify(userMateo)));

        // Listar todos los usuarios con sus Bootcamps
        const allUsers = await findAllUsers();
        console.log("Lista de todos los usuarios con sus Bootcamps:", JSON.parse(JSON.stringify(allUsers)));

        // Actualizar usuario por ID
        const updatedUser = await updateUserById(1, {
            firstName: "Pedro",
            lastName: "Sánchez"
        });
        console.log("Usuario actualizado:", updatedUser);

        // Eliminar usuario por ID
        await deleteUserById(1);
        console.log("Usuario con id=1 eliminado");

    } catch (error) {
        console.log(error.message || "Ocurrió un error interno");
    }

})();