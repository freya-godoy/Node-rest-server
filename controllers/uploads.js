import path from 'path';
import fs from 'fs';

import { v2 as cloudinary } from 'cloudinary';

import { response } from "express";
import { subirArchivo } from "../helpers/subir-archivos.js";
import { Producto } from "../models/producto.js";
import { Usuario } from "../models/usuario.js";
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cargarArchivo = async (req, res = response) => {

    try {
        // txt, md
        //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos'); <=(ejemplo)
        const nombre = await subirArchivo(req.files, undefined, 'imgs'); // Crea una nueva carpeta
        res.json({ nombre });

    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const actualizarImagen = async (req, res = response) => {


    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe el usuario con id: ${id}`
                });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe el producto con id: ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })
    }

    //Limpiar imgenes previas (borrar img)

    if (modelo.img) {
        //Borrar la img del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }

    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();
    res.json(modelo);

}

const actualizarImagenCloudinary = async (req, res = response) => {


    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe el usuario con id: ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe el producto con id: ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME, // Se puede exponer
        api_key: process.env.CLOUDINARY_API_KEY, // Se puede exponer
        api_secret: process.env.CLOUDINARY_API_SECRET, // Nunca debe revelarse
        secure: true,
    });

    //Limpiar imgenes previas (borrar img)
    // Limpiar imágenes previas
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
    }
    //El objeto de cloudinary expone una propiedad "uploader" la cual tiene un metodo "upload" 
    //en () pide el nombre del archivo

    const { tempFilePath } = req.files.archivo

    try {
        console.log("CLOUDINARY_NAME: ", process.env.CLOUDINARY_NAME)
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        modelo.img = secure_url;
    } catch (error) {
        console.log("Upload error: ", error)
    }

    await modelo.save();


    res.json(modelo);


}

const mostrarImagen = async (req, res = response) => {


    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe el usuario con id: ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `no existe el producto con id: ${id}`
                })
            }
            break;
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })
    }

    //Limpiar imgenes previas (borrar img)

    if (modelo.img) {
        //Borrar la img del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)

        }

    }

    const pathImagen = path.join(__dirname, '../assets/no-tiene-placeHolder.jpg');
    res.sendFile(pathImagen);
}

export { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary }

