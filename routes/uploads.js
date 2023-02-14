import { Router } from "express";
import { check } from "express-validator";
import { cargarArchivo, mostrarImagen } from "../controllers/uploads.js";
import { actualizarImagenCloudinary} from "../controllers/uploads.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarArchivoSubir } from "../middlewares/validar-archivo.js";


const router = Router();

router.post('/', cargarArchivo, validarArchivoSubir);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    validarCampos
], actualizarImagenCloudinary )
// ], actualizarImagen )

router.get('/:coleccion/:id', [
    check('id','El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    validarCampos
], mostrarImagen  )

export { router }