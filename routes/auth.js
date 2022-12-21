import { Router } from "express";
import { check } from "express-validator";

import { login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);


export { router }