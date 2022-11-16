import { response, request } from 'express'


const usuariosGet = (req = request, res = response) => {

const { q, nombre = 'no name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador - Get',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'post API - usuariosPost',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}


export { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch }