import { Router } from "express";
import { check } from "express-validator";
import { validarRoles } from '../middlewares/index.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
} from "../controllers/productos.js";
import { existeProductoPorId } from "../helpers/db-validators.js";
import { existeCategoriaPorId } from "../helpers/db-validators.js";




const router = Router();

//Obtener todos los productos - publico
router.get('/', obtenerProductos);

//Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

//Crear producto - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

//Actualizar producto - privado - cualquier token valido 
router.put('/:id', [
    validarJWT,
    check('categoria', 'No es un id de mongo').not().isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

//Borrar un producto - admin
router.delete('/:id', [
    validarJWT,
    validarRoles.esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);

export { router }

