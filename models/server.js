import express from 'express'
import cors from 'cors'
import { router as routerUsuarios } from '../routes/usuarios.js';
import { router as routerAuth } from '../routes/auth.js';
import { router as routerCategorias } from '../routes/categorias.js';
import { router as routerProductos } from '../routes/productos.js';
import { router as routerBuscar } from '../routes/buscar.js';
import { router as routerUploads } from '../routes/uploads.js';
import { dbConnection } from '../database/config.js';
import fileUpload from 'express-fileupload';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uplpoads: '/api/uploads'

        }

        //Conectar a base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

        //Manejar fileUpload - carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true

        }));//Aceptar archivos desde una peticion res

    }

    routes() {
        this.app.use(this.paths.buscar, routerBuscar);
        this.app.use(this.paths.auth, routerAuth);
        this.app.use(this.paths.usuarios, routerUsuarios);
        this.app.use(this.paths.productos, routerProductos);
        this.app.use(this.paths.categorias, routerCategorias);
        this.app.use(this.paths.uplpoads, routerUploads);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}


export { Server }