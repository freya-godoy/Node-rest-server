import { Router } from "express";
import { check } from "express-validator";

import { login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { googleSingIn } from "../controllers/auth.js";

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSingIn);


export { router }