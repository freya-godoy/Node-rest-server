import { Role } from "../models/role.js";
import { Usuario } from "../models/usuario.js";


const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en BD`)
    }
}

const existeEmail = async (correo = '') => {

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo}, ya esta registrado`);
    }
}

const existeUsuarioPorId = async (id) => {

    //Verificar si el correo existe
    const existeEmail = await Usuario.findById(id);
    if (!existeEmail) {
        throw new Error(`El id no existe ${id}`);
    }
}
export { esRoleValido, existeEmail, existeUsuarioPorId };