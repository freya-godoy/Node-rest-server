
import { Categoria } from "../models/categoria.js";
import { Producto } from "../models/producto.js";
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

//Validador de categoria por id

const existeCategoriaPorId = async (id) => {

    //Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
}


//Validador de categoria por id

const existeProductoPorId = async (id) => {

    //Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }
}

//Validar colecciones permitidas

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
}

export { esRoleValido, existeEmail, existeUsuarioPorId, existeCategoriaPorId, existeProductoPorId, coleccionesPermitidas };