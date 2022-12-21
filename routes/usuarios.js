import { Router } from "express";
import { check } from "express-validator";
import { usuariosDelete, usuariosGet, usuariosPatch, usuariosPost, usuariosPut, usuariosDisable } from "../controllers/usuarios.js";
import { esRoleValido, existeEmail, existeUsuarioPorId } from "../helpers/db-validators.js";

import {
    validarCampos,
    validarJWT,
    validarRoles
} from '../middlewares/index.js';

export const router = Router();

router.get('/', usuariosGet);


router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({ min: 6 }),
    check('correo').custom(existeEmail),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);


router.patch('/', usuariosPatch);

router.delete('/:id', [
    validarJWT,
    //validarRoles.esAdminRole,
    validarRoles.tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDisable);


export { Router };